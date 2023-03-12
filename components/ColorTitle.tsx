import { Text, Title } from "@mantine/core";

const ColorTitle = ({ size, order }: { size:string, order: any }) => {
    return (
        <Title order={order} size={size}>
            DailyAtrocity.<span style={{ color: '#002868' }}>U</span><span style={{ color: '#BF0A30' }}>S</span>
        </Title>
    )
}

export default ColorTitle;
