import React from 'react';

// 📌 Footer 컴포넌트: 페이지 하단에 저작권 표시
// props:
// - darkMode: 다크 모드 활성화 여부에 따라 스타일 클래스를 변경
const Footer = ({ darkMode }) => {
  return (
    // 🌙 다크 모드일 경우 'footer-dark', 라이트 모드일 경우 'footer-light' 클래스 적용
    <footer className={darkMode ? 'footer-dark' : 'footer-light'}>
      ⓒ 2025 지도 프로젝트
    </footer>
  );
};

export default Footer;