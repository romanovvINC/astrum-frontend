import React, { FC, useCallback, useState } from "react";
import { ReactComponent as PlusIcon } from "assets/svg/plus-icon.svg";
import { ReactComponent as DeleteIcon } from "assets/svg/trash-icon.svg";
import { ArticleTag } from "models/article/ArticleTag";
import { v1 } from "uuid";
import { TagCreate } from "./TagCreate";
import { Badge } from "ui/Badge";
import { ButtonMain } from "ui/Button";

import s from "./TagsSection.module.scss";

interface ITagsSectionProps {
    value: ArticleTag[];
    onChange: (newValue: ArticleTag[]) => void;
}

const TagsSection: FC<ITagsSectionProps> = ({ value, onChange }) => {
    const [creatable, setCreatable] = useState(false);

    const toggleCreatableHandler = useCallback(() => {
        setCreatable(prev => !prev);
    }, []);

    const cancelAddNewTagHandler = useCallback(() => setCreatable(false), []);

    const createTagHandler = (newTag: string) => {
        onChange([...value, { id: v1().toString(), name: newTag }]);
        cancelAddNewTagHandler();
    };

    const removeTagHandler = (id: string) => {
        const copy = value.map(t => ({ ...t }));
        const index = copy.findIndex(t => t.id === id);
        copy.splice(index, 1);
        onChange(copy);
    };

    return (
        <ul className={s.tags}>
            {value.map(t => {
                return (
                    <li
                        className={s.tag__container}
                        key={t.id}
                    >
                        <div
                            className={s.tag_delete__button}
                            onClick={() => removeTagHandler(t.id)}
                        >
                            <DeleteIcon className={s.del} />
                        </div>
                        <Badge
                            className={s.tag}
                            text={t.name}
                            invert={true}
                        />
                    </li>
                );
            })}
            <li>
                {creatable ? (
                    <TagCreate
                        onCreate={createTagHandler}
                        onCancel={cancelAddNewTagHandler}
                    />
                ) : (
                    <ButtonMain
                        className={s.add_tag_button}
                        variant={"invert"}
                        onClick={toggleCreatableHandler}
                    >
                        <PlusIcon className={s.plus} />
                    </ButtonMain>
                )}
            </li>
        </ul>
    );
};

export default TagsSection;
