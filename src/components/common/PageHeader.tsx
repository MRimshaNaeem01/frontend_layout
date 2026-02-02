
type PageHeaderProps = {
    name?: string;
    className?: any;
}
const PageHeader = ({ name, className = "" }: PageHeaderProps) => {
    return (
        <div>
            <p className={`uppercase text-white font-semibold ${className}`}>{name}</p>
        </div>
    )
}

export default PageHeader