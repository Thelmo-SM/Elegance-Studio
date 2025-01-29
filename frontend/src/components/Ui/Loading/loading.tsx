import Style from '@/styles/Loading.module.css';

export const Loading = () => {
    return (
<div className={Style.loaderContainer}>
    <div className={Style.bouncingDots}>
        <div className={Style.dot}></div>
        <div className={Style.dot}></div>
    <div className={Style.dot}></div>
    </div>
</div>
    );
};

export default Loading;