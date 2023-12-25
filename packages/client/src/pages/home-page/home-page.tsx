import styles from './home-page.module.scss';
import { ProjectsGallery } from '../../components/projects-gallery/projects-gallery';
import * as theme from '../../styles/theme.module.scss';
import cx from 'classnames';
import { motion } from 'framer-motion';

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const HomePage = () => {
    const marqueeVariants = {
        animate: {
            x: [0, -3000],
            transition: {
                x: {
                    repeat: Infinity,
                    duration: 15,
                    ease: 'linear',
                },
            },
        },
    };

    return (
        <div className={cx(styles.root, 'page')}>
            <div className={cx(styles.rectangle, styles.textWrapper)}>
                <h3 className={styles.text}>Eugene Sang: Dreams coded real</h3>
            </div>
            <div className={cx(styles.rectangle, styles.img)}></div>
            <div className={styles.logoWrapper}></div>
            <div className={styles.marquee}>
                <motion.div className={styles.marqueeContent} variants={marqueeVariants} animate="animate">
                    {Array(2).fill('WorkHub Writers • Stockisha • Harambee Manager • Top Essay Inc • Trusted Advisers Realty • ')}
                </motion.div>
            </div>
            <ProjectsGallery className={styles.gallery} headerHeight={theme.headerHeight} />
        </div>
    );
};
