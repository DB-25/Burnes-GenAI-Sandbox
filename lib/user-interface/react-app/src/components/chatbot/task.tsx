import { TaskOptions } from "../../common/constants";

export interface TaskPrimingProps {
promptRecord: Record<string,string>; 
// displayedPrompt: string; 
}

// export function TaskDisplayOptions(taskName: string) {
//     const promptOptions = TaskOptions.taskPromptMap;
//     const taskPrompt = promptOptions[taskName]; 

// }


  export default function TaskPriming(taskName: string) {
    const promptOptions = TaskOptions.taskPromptMap; 
    const taskPrompt = promptOptions[taskName]; 
    const apiPrompt = taskPrompt.prompt; 
    const taskInstructions = taskPrompt.instructions; 
    if (!taskPrompt) {
        throw new Error("No problem found for task")
    }
    console.log("Prompt: ", apiPrompt);
    console.log("Instructions: ", taskPrompt.instructions);

    return taskPrompt; 


  }

  // export function TaskPriming2(task: string): string {
  //   const promptOptions = TaskOptions.taskPromptMap; 
  //   const taskPrompt = promptOptions[task]; 
  //   const apiPrompt = taskPrompt.prompt; 

  //   const taskInstructions = taskPrompt.instructions; 
  //   if (!taskPrompt) {
  //       throw new Error("No problem found for task")
  //   }
  //   console.log("Prompt: ", apiPrompt);
  //   console.log("Instructions: ", taskPrompt.instructions);

  //    return taskInstructions; 
  // }
