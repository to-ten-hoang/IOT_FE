import { Row, Col } from 'antd';
import React from 'react';
import ProfileCard from "./ProfileCard";
import "./Profiles.scss";

function Profiles() {
  const profiles = [
    {
      id: 1,
      name: "Đặng Minh Anh",
      className: "D21CNPM04",
      studentId: "B21DCCN140",
      avatarUrl: "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/453076949_1976107129487320_4676227662478507285_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEZEhI4WObLIVzIHYnJnJMBRPfayvUPo11E99rK9Q-jXWW6EIu54x-WXrTKQ4y09uQhoJl0oU_sgCMiyCJpiHyG&_nc_ohc=A0VN25ryJq0Q7kNvgGPxJCc&_nc_ht=scontent.fhan18-1.fna&oh=00_AYBb_Xw4bx7Q0anqNvGkRmIGIYwqrvYRoftgSxcgpGQ3eg&oe=66D0D493",
      coverUrl: "https://cdn.sgtiepthi.vn/wp-content/uploads/2022/08/295668626_2343891112417305_8394540339713625809_n.jpg",
      githubUrl: "https://github.com/Cmloopy?tab=repositories",
    },
    {
      id: 2,
      name: "Vũ Huy Hoàng",
      className: "D21CNPM1",
      studentId: "B21DCCN398",
      avatarUrl: "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/404468562_1360735678150906_2227544323508199255_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEEGKD7GtI4tObz6KOiQQnDciJV2oCqxvRyIlXagKrG9MJ4ANac2yX_G1ggidKlHZsFaXSZMXiuOVCJKW_5u9CU&_nc_ohc=7c-AfTl1ytwQ7kNvgGH9SUl&_nc_ht=scontent.fhan18-1.fna&_nc_gid=ATsWdVKCw2toFKzRG4z7Z-O&oh=00_AYA4QhMyxEa3Ixg6VYDDfkK7Kv3GfBvfiB3LcwFfSRoXmQ&oe=66D0CEB9",
      coverUrl: "https://www.baokontum.com.vn/uploads/Image/2023/05/07/173837pasted%20image%200.png",
      githubUrl: "https://github.com/vuhuyhoang12abm",
    },
    {
      id: 3,
      name: "Lê Văn C",
      className: "CNTT3-K14",
      studentId: "B180zzzz",
      avatarUrl: "https://example.com/avatar3.jpg",
      coverUrl: "https://example.com/cover3.jpg",
      githubUrl: "https://github.com/levanc",
    },
  ];

  return (
    <div className="profiles-container">
      <Row gutter={16}>
        {profiles.map(profile => (
          <Col span={8} key={profile.id}>
            <ProfileCard
              name={profile.name}
              className={profile.className}
              studentId={profile.studentId}
              avatarUrl={profile.avatarUrl}
              coverUrl={profile.coverUrl}
              githubUrl={profile.githubUrl}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Profiles;
