import {Provider, themePodil, Picture, Header, ButtonGroup, Button} from 'koval-ui';
import 'koval-ui/dist/index.css';
import Image from 'next/image';
import styles from './header.module.css';

export default function PageHeader() {
    return (
        <Header className={styles.styleHeader}>
            <Picture
                className={styles.logo}
                src="/stonks-logo.png"
                alt="Market Logo"
                />
            <ButtonGroup className={styles.navbar}>
                <Button className={styles.navbarItem}>
                    Home
                </Button>
                <Button className={styles.navbarItem}>
                    About
                </Button>
                <Button className={styles.navbarItem}>
                    Contact
                </Button>
            </ButtonGroup>
        </Header>
    );
  }
  