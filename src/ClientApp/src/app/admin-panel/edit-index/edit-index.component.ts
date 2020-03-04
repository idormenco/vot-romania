import { Component, OnInit } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-edit-index",
  templateUrl: "./edit-index.component.html",
  styleUrls: ["./edit-index.component.scss"]
})
export class EditIndexComponent implements OnInit {
  htmlContent: string = "";
  constructor() {}

  ngOnInit() {}

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "auto",
    minHeight: "0",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: undefined,
    customClasses: [],

    uploadUrl: "v1/image",
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [
      ["bold", "italic", "subscript","selectFont"],
      ["fontSize"],
      ["insertImage", "insertVideo"],
      ["link", "unlink", "insertHorizontalRule"],
      
    ]
  };
}
