export async function load({fetch}){
    const res = await fetch('https://api.teleport.org/api/urban_areas/')
    const data = await res.json()
    return data
}