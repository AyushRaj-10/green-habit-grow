
import React from "react";

interface TimelineProps {
  children: React.ReactNode;
}

interface TimelineItemProps {
  children: React.ReactNode;
}

export const Timeline: React.FC<TimelineProps> = ({ children }) => {
  return <div className="timeline">{children}</div>;
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ children }) => {
  return <div className="timeline-item">{children}</div>;
};
