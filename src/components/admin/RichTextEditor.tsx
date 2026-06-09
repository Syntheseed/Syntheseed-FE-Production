import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './RichTextEditor.css';

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

// `formats` is intentionally omitted so Quill keeps all of its default formats,
// which preserves as much of any pre-existing pasted/CKEditor HTML as possible.
const modules = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['blockquote', 'code-block', 'link'],
    ['clean'],
  ],
};

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  return (
    <div className="rte">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
      />
    </div>
  );
}
