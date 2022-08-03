import { useEffect, useState } from "react";

export default function RadialProgress(props) {
    let circumference;
    const [points, setPoints] = useState();

    //didMount
    useEffect(() => {
        setTimeout(() => setPoints(props.points));
    }, []);

    useEffect(() => {
        const circle = document.getElementById(props.id);
        const radius = circle.r.baseVal.value;
        circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        animateRadial(props.id, (points / props.threshold) * 100);
    }, [points]);

    function animateRadial(id, percent) {
        const circle = document.getElementById(id);
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    return (
        <div className="row progress">
            <div className="col-xs-6 progress-container">
                <svg width="140" height="140">
                    <circle fill="#F7F7F7" r="66" cx="70" cy="70" />
                    <circle
                        stroke="#E3E6E8"
                        strokeWidth="18"
                        fill="transparent"
                        r="44"
                        cx="70"
                        cy="70"
                    />
                    <circle
                        id={props.id}
                        className="progress-radial"
                        strokeWidth="18"
                        fill="transparent"
                        r="44"
                        cx="70"
                        cy="70"
                    />
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="txt-points"
                    >
                        {points}/{props.threshold}
                    </text>
                </svg>
            </div>
        </div>
    );
}
