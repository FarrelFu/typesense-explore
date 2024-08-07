import { supabase } from './supabaseClient';
import typesense from './typesenseClient';

//untuk update collection kalau terjadi perubahan di database

const syncData = async () => {
  //fetch data di supabase
  const { data: foods, error } = await supabase.from('Food').select('*');
  console.log(foods);
  if (error) {
    console.error('Error fetching data from Supabase:', error);
    return;
  }

  //collection, menyerupai database
  const foodschema = {
    name: 'fooddies',
    'fields': [
      {name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'price', type: 'int32' },
      { name: 'instock', type: 'int32' },
    ],
  };

  //ngapus collection yang lama, untuk buat collection baru
  try {
    await typesense.collections('fooddies').delete();
  } catch (err) {
    console.warn('Collection does not exist, skipping delete step.');
  }

  //buat collection
  await typesense.collections().create(foodschema);
  console.log('Collection created');
  
  try {
    //masukan data dari database ke dalam collection
    await typesense.collections('fooddies').documents().import(foods);
    console.log('Data synced with TypeSense');
  } catch (err) {
    console.error('Error syncing data with TypeSense:', err);
    if (err.importResults) {
      err.importResults.forEach((result: any) => {
        console.log('abc')
        if (result.error) {
          console.error(`Document ID ${result.document.id} failed: ${result.error}`);
        }
      });
    }else{
      console.log('bcd');
    }
  }

  console.log('Data synced to Typesense');
};
  

export default syncData;
