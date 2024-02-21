// "use client";
// const { useState, useEffect, useRef } = require("react");
// const WebViewer = require("@pdftron/webviewer");
// const { useRouter } = require("next/navigation");
// const SubmitModal = require("@/components/SubmitModal");

// const CreateUploadBol = ({ documentType }) => {
//   const blViewer = useRef(null);
//   const router = useRouter();
//   const [submitOpen, setSubmitOpen] = useState(false);
//   const [fileState, setFileState] = useState();

//   const handleFileChange = (options) => {
//     options.fileInputElement.onchange = (e) => {
//       const target = e.target;
//       const file = target?.files ? target.files[0] : null;
//       if (file) {
//         options.setFileState({ file });
//         options.setshowNewUploadBtn(true);
//         options.instance.UI.loadDocument(file);
//       }
//     };
//   };

//   useEffect(() => {
//     const initialDoc =
//       documentType === "create" ? "/files/Bill_of_Lading_Form.pdf" : "";
//     WebViewer(
//       {
//         path: "/webviewer",
//         initialDoc,
//         licenseKey:
//           "demo:1692240580145:7c52d879030000000088a56375b210f8e0ab4362a828a53dc8818aeb0b",
//       },
//       blViewer.current
//     ).then((instance) => {
//       const { documentViewer, annotationManager, Annotations } = instance.Core;
//       const { setHeaderItems, disableElements } = instance.UI;

//       const filePicker = document.getElementById("file-picker");

//       if (filePicker) {
//         handleFileChange({
//           fileInputElement: filePicker,
//           instance: instance,
//           setFileState: setFileState,
//           setshowNewUploadBtn: setshowNewUploadBtn,
//         });
//       }

//       setHeaderItems((header) => {
//         const HomeBtn = {
//           type: "actionButton",
//           img: '<svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect width="25" height="25" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_341_342" transform="scale(0.015625)"/></pattern><image id="image0_341_342" width="64" height="64" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADo0lEQVR4nO1aW6hNQRge13KXSyilEEXx4EGESF6UvPCAkgcpXjx6HM6af5999l7/LNuZ+ddZByl5OikPbqHwKKS8ECG3Uo5DCsf9aJy9zx7X9jpr6ey1zVdTuz23Nd+a+b///9cw5uDg4OAwMPCKaoYp7H8EIG0WSO9N8QK1if1PAKl3g6QvIKnHFIH6K6DeyxodnPOhgBT1LVzSS0B6VSWCDnDOB7NGRLFYHCWkPllZLEj9tBnDhU1SzReoH1kknEDEEayRUCioqULSdWuRN/Ol0vRKvZDRNCH1Dav+CpRKk1kjAIrhPJD00FrcOV4qjf25HVdqtJB01toh93KoZrMsw/P1UpC6s29RqA9HUTTsT+057xgOqI9ZNuJZs0+LWBYBUm0AqbvjWvmenp5Bpq1FwpschmtZdmVOf/BkuCXuGELSdpD0qUzEJyFpB6t3dHR0DBFSky1zXhCu7O94Qqr1gPpt1S5QnmVN5lhC5AK1WCA9t0g48jc7UpcylxReIZoFqO9Wd5Y+39JyaAzLkswlBew/OOUnkq+a/1iWZC6NYwZIp6zj8KApoLksSzKXkqFts2xNl+erZSxrMpcUAmnPd+J7n6FbIG1kWZO5pBC+2iZQfyzvws8C9S6WNZlLCvDDNYD02nquUuohdeEfy1xSwH69wLwQK8Fy1MQVqQyez0fjjLW1NPi0idxYnaFZ0kwh6Y61E46nMrAXqBW2zJmsDqtTcD+aBKivlZ/3SyqDekG4skLAQBq8WmFHkqkM6DkCQrcDwB0BcjYAnBGkVFQg19o6UaDeKiS1G8+yt1C7+Y/jwQkNqwL57w6VLlQiyN8VIemdQGpJkk+oSwJyqGYLqW//uGDdZZyWXhdbd/1Qh3Srv98E6o4AYb76ID2xvMlLZhwTWVbamN+AepWQdNki4rGJQRqAAOpblJC0z+T9/9TW1AmpPav9xUwTIExau7qtw9r7UbsVfK3LLAGA+kz5vHfGMWw8CMYLpBdl4k5lkgAeRSPN7Y9yfK7izlvNPOnuOJ/L64aApoDmVvvFvwJj8oyV/jm/dU7mCABJy/vOv69Wx53X9LEUYXnmCPASqke/iXcEaLcDwB0BcjYAnBEkpwIsDXhOBkPnB4BzhMh5guBcYXKxgDAJTKQLtRT7PkHSYCjWvEj303WFfXMT7Pdp7FpLLmhbEnde0yfJnCYZkwoBnPOhJqNT6xv49Y1o1Z87BUnnBZ92pkKAg4ODA2tgfAP6KcGlCP+HBwAAAABJRU5ErkJggg=="/></defs></svg>',
//           onClick: () => router.back(),
//         };
//         const SubmitBtn = {
//           type: "actionButton",
//           img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
//           onClick: () => setSubmitOpen(true),
//         };
//         header.delete("toggleNotesButton");
//         header.delete("viewControlsButton");
//         header.delete("menuButton");
//         header.delete("leftPanelButton");
//         header.delete("panToolButton");
//         header.delete("selectToolButton");
//         header.delete("moreButton");
//         header.unshift(SubmitBtn);
//         header.unshift(HomeBtn);
//       });

//       disableElements([
//         "toolbarGroup-Shapes",
//         "toolbarGroup-Edit",
//         "toolbarGroup-Annotate",
//         "toolbarGroup-Insert",
//         "toolbarGroup-Forms",
//       ]);

//       documentViewer.addEventListener("documentLoaded", () => {
//         const rectangleAnnot = new Annotations.RectangleAnnotation({
//           PageNumber: 1,
//           X: 100,
//           Y: 150,
//           Width: 200,
//           Height: 50,
//           Author: annotationManager.getCurrentUser(),
//         });

//         annotationManager.addAnnotation(rectangleAnnot);
//         annotationManager.redrawAnnotation(rectangleAnnot);
//       });
//     });
//   }, [documentType, router]);

//   return (
//     <div ref={blViewer} className="w-full">
//       {documentType === "upload" && !fileState && (
//         <div
//           id="file-picker"
//           className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-primary-900 border-4 border-borderGrey p-24 rounded-md"
//         >
//           <h4 className="text-2xl font-semibold text-center underline mb-4">
//             Upload Your BoL Template
//           </h4>
//           <input
//             type="file"
//             className="cursor-pointer text-center"
//             accept=".pdf,.docx,.doc,.xlsx,.xls"
//           />
//         </div>
//       )}
//       <SubmitModal
//         isOpen={submitOpen}
//         onClose={() => setSubmitOpen(false)}
//         submitFunc={() => console.log("submit form to blockhainDB")}
//       />
//     </div>
//   );
// };

// module.exports = CreateUploadBol;
