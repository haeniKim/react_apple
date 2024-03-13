import SpoonImage from './spoon.png';

export default function Dmenu() {
    return (
        <>
            <b>Nospoon</b>
            <img src={SpoonImage} alt="Spoon" style={{ verticalAlign: 'middle', marginLeft: '8px', width: '100px', height: '100px' }} />
        </>
    );
};