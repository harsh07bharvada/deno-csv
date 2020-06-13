import {join} from "https://deno.land/std/path/mod.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";
import { BufReader } from "https://deno.land/std/io/mod.ts";

interface Planet{
    [key :string] : string
}

const getHabitablePlanets = async () =>{

    const path  = join(".","original.csv");
    const file = await Deno.open(path);

    const bufReader = new BufReader(file);

    const result = await parse(bufReader,{
        comment:"#",
        header: true
    });
    Deno.close(file.rid);
    const planets = (result as Array<Planet>).filter(planet=>{
        return planet["koi_disposition"] === "CONFIRMED" &&
        Number(planet["koi_prad"]) > 0.5 && Number(planet["koi_prad"]) < 1.5
        && Number(planet["koi_smass"]) > 0.78  && Number(planet["koi_smass"]) < 1.04 
        && Number(planet["koi_srad"]) > 0.99 && Number(planet["koi_srad"]) < 1.01;
    }) ;
    return planets;
}

console.log(await getHabitablePlanets());


