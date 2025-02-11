import { Card, CardContent } from "../Shad/card";
import { Avatar, AvatarFallback, AvatarImage } from "../Shad/avatar";
import "../Style/MetricCard.css"; // Import the CSS file

export const MetricCard = ({ metric }) => {
  return (
    <Card>
      <CardContent className="metric-card-content">
        <div className="metric-icon-container">
          <metric.icon className="metric-icon" />
        </div>
        <div className="flex-1">
          <p className="metric-text">{metric.title}</p>
          <div className="flex items-center gap-2">
            <p className="metric-value">{metric.value}</p>
            {metric.change && (
              <span className={metric.trend === "up" ? "metric-change-up" : "metric-change-down"}>
                {metric.change} this month
              </span>
            )}
            {metric.avatars && (
              <div className="metric-avatars">
                {metric.avatars.map((avatar, i) => (
                  <Avatar key={i} className="metric-avatar">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
