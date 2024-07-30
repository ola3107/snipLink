import clsx from "clsx";
import Link from "next/link";


interface breadcrumb {
    label: string;
    href: string;
    active?: boolean;
}

export const BreadCrumb = ({ children }: {children: breadcrumb[]}) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center text-xl md:text-3xl font-bold">
                {children.map((item, index) => (
                    <li key={index} 
                    className={clsx(
                        item.active ? 'dark:text-gray-500 text-slate-500' : 'dark:text-slate-200 text-slate-900',
                      )}
                    
                    >
                        <Link href={item.href}>{item.label}</Link>
                        {index < children.length - 1 ? (
                        <span className="mx-3 inline-block">/</span>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    )

}