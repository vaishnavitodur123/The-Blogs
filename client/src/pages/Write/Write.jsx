import React, { useState } from "react";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CategoryDropdown from "../../components/ui/CategoryDropdown/CategoryDropdown";
import "./Write.css";

export default function Write() {
    const [value, setValue] = useState("");

    const handleCategorySelect = (selectedCategory) => {
        console.log("Selected category:", selectedCategory);
    };

    const handlePostPublish = () => {
        toast.success("Post created successfully");
    };

    return (
        <div className="write-main">
            <div className="write-content">
                <input type="text" placeholder=" Your blog title" />
                <div className="editorContainer">
                    <ReactQuill
                        className="editor"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
            <div className="write-menu">
                <CategoryDropdown onSelect={handleCategorySelect} />
                <button onClick={handlePostPublish}>Publish</button>
            </div>
        </div>
    );
}
