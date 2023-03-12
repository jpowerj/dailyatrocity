import ColorTitle from "./ColorTitle";
import Link from "next/link";
import { ActionIcon, Button, Tooltip } from "@mantine/core";
import { ChartBar, InfoCircle } from "tabler-icons-react";
import { useState } from "react";
import AboutModal from "./AboutModal";

const Header = ({ isToday }: { isToday: boolean }) => {
    const [aboutModalOpened, setAboutModalOpened] = useState(false);
    return (
        <>
        <AboutModal opened={aboutModalOpened} setOpened={setAboutModalOpened} />
        <div className="title-main">
            <div className="title-text">
                {isToday
                    ? <ColorTitle size="h1" order={1} />
                    : <Link href="/"><ColorTitle size="h1" order={1} /></Link>
                }
            </div>
            <div className="title-buttons">
                <Tooltip label="About" position="right" withArrow>
                <ActionIcon onClick={() => setAboutModalOpened(true)}>
                    <InfoCircle size={24} color="gray" />
                </ActionIcon>
                </Tooltip>
                <Tooltip label="By the Numbers" position="right" withArrow>
                <Link href="/stats">
                    <ChartBar size={24} color="gray" />
                </Link>
                </Tooltip>
            </div>
        </div>
        </>
    )
}

export default Header;