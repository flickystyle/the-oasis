import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        console.error(error);
        throw new Error('cabins could not be loaded');
    }

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be deleted');
    }
}

export async function addOrEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        '/',
        ''
    );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    let query = supabase.from('cabins');

    !id
        ? (query = query.insert([{ ...newCabin, image: imagePath }])) //create new cabin
        : (query = query
              .update({ ...newCabin, image: imagePath })
              .eq('id', id)); //update cabin

    const { data, error } = await query.select().single();

    if (error) {
        if (hasImagePath) {
            console.error(error);
            throw new Error('Cabin could not be updated');
        } else {
            console.error(error);

            throw new Error('Cabin could not be added');
        }
    }

    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);
        console.error(storageError);
        throw new Error(
            'Image could not be uploaded and the cabin was not added'
        );
    }

    return data;
}
