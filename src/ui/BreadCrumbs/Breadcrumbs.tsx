import { FC } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import s from "./BreadCrumbs.module.scss";

interface IBreadcrumbsProps {
    paths: string[];
}

const Breadcrumbs: FC<IBreadcrumbsProps> = ({ paths }) => {
    return (
        <Breadcrumb className={s.breadcrumbs}>
            {paths.map((p, i) => (
                <BreadcrumbItem key={i}>{p}</BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
