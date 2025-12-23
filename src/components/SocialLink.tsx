import type { JSX } from "react";

import { instagramSvg, linkedinSvg } from "@/assets";
import { LINK_TARGET, LINK_REL, SOCIAL_LINKS } from "@/config";
import { useSocialLink } from "@/hooks";
import type { DeepLinkHandler } from "@/hooks";

import "@/styles/SocialLink.scss";

interface ImgProps {
    src: string;
    alt: string;
    className: string;
}

interface SocialLinkProps {
    href: string;
    onClick: DeepLinkHandler;
    img: ImgProps;
}

const SocialLink = ({ href, onClick, img }: SocialLinkProps): JSX.Element => (
    <a href={href} target={LINK_TARGET} rel={LINK_REL} onClick={onClick}>
        <img src={img.src} alt={img.alt} className={`logo ${img.className}`} />
    </a>
);

export const InstagramLink = (): JSX.Element => {
    const { handleInstagramClick } = useSocialLink();

    const props: SocialLinkProps = {
        href: SOCIAL_LINKS.instagram.webUrl,
        onClick: handleInstagramClick,
        img: {
            src: instagramSvg,
            alt: "Instagram logo",
            className: "instagram",
        },
    };

    return <SocialLink {...props} />;
};

export const LinkedInLink = (): JSX.Element => {
    const { handleLinkedInClick } = useSocialLink();

    const props: SocialLinkProps = {
        href: SOCIAL_LINKS.linkedin.webUrl,
        onClick: handleLinkedInClick,
        img: {
            src: linkedinSvg,
            alt: "LinkedIn logo",
            className: "linkedin",
        },
    };

    return <SocialLink {...props} />;
};
