

// import * as React from "react";
// import AnnotationContext from "@cloudscape-design/components/annotation-context";
// import Form from "@cloudscape-design/components/form";
// import Hotspot from "@cloudscape-design/components/hotspot";
// import Button from "@cloudscape-design/components/button";
// import SpaceBetween from "@cloudscape-design/components/space-between";
// import FormField from "@cloudscape-design/components/form-field";
// import Input from "@cloudscape-design/components/input";

// export default () => {
//   return (
//     <AnnotationContext
//       currentTutorial={{
//         tasks: [
//           {
//             title: "Model Selection: Claude 3 Model",
//             steps: [
//               {
//                 title: "Model Selection",
//                 content: (
//                   <>
//                     We like this Claude 3 model the most
//                     for translation. Feel free to test out
//                     others, and let us know what you
//                     think!
//                   </>
//                 ),
//                 hotspotId: "bucket-name"
//               },
//               {
//                steps: 
//               }
//             ]
//           }
//         ]
//       }}
//       i18nStrings={{
//         stepCounterText: (stepIndex, totalStepCount) =>
//           " ",
//         taskTitle: (taskIndex, taskTitle) =>
//           " " + taskTitle,
//         labelHotspot: (
//           openState,
//           stepIndex,
//           totalStepCount
//         ) =>
//           openState
//             ? "close annotation for step " +
//               (stepIndex + 1) +
//               " of " +
//               totalStepCount
//             : "open annotation for step " +
//               (stepIndex + 1) +
//               " of " +
//               totalStepCount,
//         nextButtonText: "Next",
//         previousButtonText: "Previous",
//         labelDismissAnnotation: "dismiss annotation"
//       }}
//     >
//       <Form
//         actions={
//           <Hotspot
//             side="right"
//             hotspotId="create-bucket-button"
//           >
//             <Button variant="primary">
//               Create bucket
//             </Button>
//           </Hotspot>
//         }
//       >
//         <SpaceBetween direction="vertical" size="l">
//           <FormField label="Bucket name">
//             <Hotspot side="right" hotspotId="bucket-name">
//               <Input value={""} />
//             </Hotspot>
//           </FormField>
//         </SpaceBetween>
//       </Form>
//     </AnnotationContext>
//   );
// }