import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";
import { string } from "../../ParamBuilder";
import { exec } from "child_process";

export const RunCommand: ComputerFactory = (): Computer => ({
  name: 'RunCommand',
  inputs: ['input'],
  outputs: ['output', 'error'],
  params: {
    ...DefaultParams,
    command: string('command').value('echo "Hello World"').get(),
  },

  async *run({ input, output, params }: RunArgs) {
    while(true) {
      const [ { params: { command } } ] = input.pull()

      console.log("HERE")

      let execStdout;
      let execError;

      try {



        exec(command, (error, stdout, stderr) => {
          if (error) return execError = error
          if (stderr) return execError = stderr
        
          execStdout = stdout;
        });

        if(execStdout) {
          output.push(execStdout)
          yield;
          continue;
        }

        if(execError) {
          output.pushTo('error', execError)
          yield;
          continue;
        }
      } catch(e) {
        console.log(e)
        throw e;
      }
    }
  },
});
