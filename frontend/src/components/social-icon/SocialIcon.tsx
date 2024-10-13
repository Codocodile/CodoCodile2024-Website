interface ISocialIcon {
    href?: string
    socialName: string
}

const SocialIcon = (props: ISocialIcon) => {

    return (
        <a href={props.href ? props.href : "#"} target="_blank">
            <img
                src={`assets/icons/${props.socialName.toLowerCase()}.svg`}
                alt={`${props.socialName} logo`}
                className="h-5 transition-transform transform hover:scale-110 hover:brightness-0 hover:invert"
            />
        </a>
    );
};

export default SocialIcon;
