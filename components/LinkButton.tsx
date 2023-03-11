import { Button } from "@mantine/core";
import Link from "next/link";
import { ExternalLink } from "tabler-icons-react";

const LinkButton = ({ isDisabled, href, buttonOnClick, children, ...props }: { isDisabled: boolean, href: string, buttonOnClick: any, children: any }) => {
    const buttonStyle = isDisabled ? { flex: 1 } : { width: '100%' }
    const theButton = (
        <Button
            style={buttonStyle}
            onClick={(event) => {
                if (isDisabled) {
                    return event.preventDefault();
                } else {
                    return buttonOnClick();
                }
            }}
            disabled={isDisabled}
            rightIcon={<ExternalLink size="1.125rem" />}
            {...props}
        >
            {children}
        </Button>
    );
    if (isDisabled) {
        return theButton;
    }
    return (
        <Link
            style={{ flex: 1 }}
            href={href}
            //target="_blank"
            //rel="noopener noreferrer"
            //href="#"
            passHref={!isDisabled}>
            {theButton}
        </Link>
    );
}

export default LinkButton;