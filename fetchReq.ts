import * as log from "https://deno.land/std/log/mod.ts";

await log.setup({
    handlers: {
      console: new log.handlers.ConsoleHandler("INFO"),
  
      file: new log.handlers.FileHandler("INFO", {
        filename: "./log.txt",
        formatter: "{levelName} {msg}",
      }),
    },
  
    loggers: {
      default: {
        level: "INFO",
        handlers: ["console", "file"],
      },
  
      tasks: {
        level: "ERROR",
        handlers: ["console"],
      },
    },
  });



const downLoadLaunchData = async ()=>{
    const bodyOpts = {
        name: "Elon Musk",
        job: "billionaire"
      };
      log.info(`Downloading started......`);
    const res = await fetch(`https://reqres.in/api/users`,{
        method:"POST",
        body: JSON.stringify(bodyOpts),
        headers:{
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
    
    const response = await res.json();
    log.info(`Data : ${JSON.stringify(response)}`);
    if(res.ok){
        log.info(`Downloading completed......`);
    }
    else{
        log.warning(`Downloading failed!`);
    }
    return response;
}

const res = await downLoadLaunchData();

