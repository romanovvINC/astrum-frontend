import { FC, useMemo } from "react";
import { Col, Row } from "reactstrap";
import { ProfileTimeline, TimelineTypeName } from "models/profile/ProfileTimeline";
import { TimelineInterval } from "models/profile/TimelineInterval";
import { ProfileTableTimeline } from "modules/profile";
import { calculateNextIntervalType, changeInterval } from "modules/profile/helpers/timeLineHelpers";
import { ProfileTimelineLegend } from "modules/profile/components/ProfileTimeline";
import { Select } from "ui/Select";

interface IProfileEditTimelineSectionProps {
    value: ProfileTimeline;
    onChange: (newValue: ProfileTimeline) => void;
    onChangeTimelineType: (newValue: ProfileTimeline) => void;
}

const ProfileEditTimelineSection: FC<IProfileEditTimelineSectionProps> = ({
    value,
    onChange,
    onChangeTimelineType,
}) => {
    const options = useMemo<{ name: string; value: string }[]>(() => {
        const result: { name: string; value: string }[] = [];
        Object.entries(TimelineTypeName).forEach(pair => {
            result.push({ name: pair[1], value: pair[0] });
        });
        return result;
    }, []);
    const selectValue = { name: TimelineTypeName[value.timelineType], value: String(value) };

    const changeTimelineTypeHandler = (newType: { name: string; value: string }) => {
        const timelineType = Number(newType.value);
        onChangeTimelineType({ ...value, timelineType });
    };

    const clickCellHandler = (cell: TimelineInterval) => {
        const nexIntervalType = calculateNextIntervalType(cell);
        const intervals = changeInterval({ ...cell, intervalType: nexIntervalType }, value.intervals);
        onChange({
            timelineType: value.timelineType,
            intervals,
        });
    };

    return (
        <Col>
            <h4>Таймлайн доступности</h4>
            <Row>
                <Select
                    label={"Статус"}
                    value={selectValue}
                    options={options}
                    //eslint-disable-next-line
                    //@ts-ignore
                    onChange={changeTimelineTypeHandler}
                />
            </Row>
            <Row>
                <ProfileTableTimeline
                    intervals={value.intervals}
                    onClickCell={clickCellHandler}
                />
            </Row>
            <Row>
                <ProfileTimelineLegend />
            </Row>
        </Col>
    );
};

export default ProfileEditTimelineSection;
