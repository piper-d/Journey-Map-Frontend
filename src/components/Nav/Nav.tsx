import React from 'react';
import styles from './Nav.module.css';
import * as data from './links.json';
const linkString = JSON.stringify(data);
const links = JSON.parse(linkString).links;

type Link = {
    label: string;
    href: string;
}

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
    return (
        <div className={styles.linksContainer}>
            {links.map((link: Link) => {
                return (
                    <div key={link.href} className={styles.link}>
                        <a href={link.href}>
                            {link.label}
                        </a>
                    </div>
                )
            })}
        </div>
    )
}

const Nav: React.FC<{}> = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <span> JourneyMap</span>
            </div>
            <Links links={links} />
        </nav>
    )
}

export default Nav