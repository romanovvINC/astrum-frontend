import { FC } from "react";
import { Col, Row } from "reactstrap";
import { SocialNetworks } from "models/profile/SocialNetworks";
import { InputMain, InputMainOnChangeArgumentType } from "ui/Input";

interface IProfileEditSocialNetworksSectionProps {
    value: SocialNetworks;
    onChange: (newValue: SocialNetworks) => void;
}

const ProfileEditSocialNetworksSection: FC<IProfileEditSocialNetworksSectionProps> = ({ value, onChange }) => {
    const changeHandler = (field: string) => {
        return (e: InputMainOnChangeArgumentType) => {
            if (e !== null && !(e instanceof Date)) {
                const result = { ...value };
                result[field] = e.target.value.replace(/@/g, "");
                onChange(result);
            }
        };
    };

    return (
        <Col>
            <h4>Социальные сети</h4>
            <Row>
                <Col xl={4}>
                    <InputMain
                        value={value.telegram ?? ""}
                        label={"Telegram"}
                        placeholder={"myprofile"}
                        onChange={changeHandler("telegram")}
                    />
                </Col>
                <Col xl={4}>
                    <InputMain
                        value={value.github ?? ""}
                        label={"Github"}
                        placeholder={"githubName"}
                        onChange={changeHandler("github")}
                    />
                </Col>
                <Col xl={4}>
                    <InputMain
                        value={value.vk ?? ""}
                        label={"VK"}
                        placeholder={"id123456789"}
                        onChange={changeHandler("vk")}
                    />
                </Col>
            </Row>
        </Col>
    );
};

export default ProfileEditSocialNetworksSection;
