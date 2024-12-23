export default function ({
    onClick,
    title,
    background,
    border,
}: {
    onClick?: () => void;
    title: string;
    background?: string;
    border?: string;
}) {
    return (
        <button
            className="z-40 pb-1 px-6 hover:pt-3 hover:pb-4 transition-all rounded-b-[20px] font-bold text-white cursor-pointer text-lg"
            onClick={onClick}
            style={{ background, borderRight: border, borderBottom: border, borderLeft: border }}>
            {title}
        </button>
    );
}
