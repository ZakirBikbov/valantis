import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    Contacts: @zakir_bikbov
                </div>
            </div>
        </footer>
    )
}

export default Footer