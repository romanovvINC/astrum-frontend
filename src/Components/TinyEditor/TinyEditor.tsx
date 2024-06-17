import React, { FC, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as EditorType } from "tinymce";

import classNames from "classnames";
import s from "./TinyEditor.module.scss";

interface IEditorProps {
    value: { text: string; html: string };
    invalid?: boolean;
    onChange: (newValue: { text: string; html: string }) => void;
}

const tinyMceConfig = {
    height: 500,
    menubar: true,
    language: "ru",
    plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste code help wordcount",
    ],
    toolbar:
        "undo redo | formatselect | " +
        "bold italic backcolor | alignleft aligncenter " +
        "alignright alignjustify | bullist numlist outdent indent | " +
        "removeformat | help | language",
    content_langs: [
        { title: "Russian", code: "ru" },
        { title: "English", code: "en" },
    ],
    image_title: true,
    automatic_uploads: true,
};

const TinyEditor: FC<IEditorProps> = ({ value, invalid = false, onChange }) => {
    const editorRef = useRef<any>(null);

    const onEditorChange = (a: string, editor: EditorType): void => {
        onChange({ html: a, text: editor.getContent({ format: "text" }) });
    };

    const init = (evt: any, editor: EditorType) => {
        editor.setContent(value.html);
        onChange({ html: editor.getContent({ format: "html" }), text: editor.getContent({ format: "text" }) });
    };

    return (
        <div className={classNames({ [s.invalid]: invalid })}>
            <Editor
                value={value?.html ?? ""}
                tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
                onInit={init}
                init={tinyMceConfig}
                onEditorChange={onEditorChange}
            />
        </div>
    );
};

export default TinyEditor;
