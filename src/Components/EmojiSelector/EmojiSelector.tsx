import { FC, memo, useEffect, useRef } from "react";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";

interface IEmojiSelectorProps {
    className?: string;
    isOpen: boolean;
    onSelectEmoji: (emoji: EmojiClickData) => void;
    onClose: () => void;
}
const EmojiSelector: FC<IEmojiSelectorProps> = ({ className = "", isOpen, onSelectEmoji, onClose }) => {
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutsideHandler = (e: MouseEvent) => {
            if (!isOpen) {
                return;
            } else if (pickerRef.current && !pickerRef.current.contains(e.target as Node) && isOpen) {
                onClose();
            }
        };
        document.addEventListener("click", clickOutsideHandler, false);
        return () => {
            document.removeEventListener("click", clickOutsideHandler, false);
        };
    }, [isOpen]);

    return (
        <div
            ref={pickerRef}
            className={className}
        >
            <EmojiPicker
                searchDisabled={true}
                emojiVersion={"12.0"}
                emojiStyle={EmojiStyle.NATIVE}
                previewConfig={{
                    showPreview: false,
                }}
                lazyLoadEmojis={true}
                width={300}
                height={350}
                onEmojiClick={onSelectEmoji}
            />
        </div>
    );
};

export default memo(EmojiSelector);
