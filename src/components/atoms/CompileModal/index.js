import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import "../../../prism.css";
import styles from "./CompileModal.module.scss";

const COPY_MSG_DURATION = 2000;

const CompileModal = ({ children, closePortal }) => {
  const portalRef = useRef();

  const [isMounted, setIsMounted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (document) {
      const portal = document.getElementById("portal");

      portalRef.current = portal;
    }
  }, []);

  useEffect(() => {
    if (!isCopied) return;

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, COPY_MSG_DURATION);

    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleClick = () => {
    navigator.clipboard.writeText(children);
    setIsCopied(true);
  };

  if (portalRef.current && isMounted) {
    return createPortal(
      <div className={styles.container}>
        <div className={styles.background} onClick={closePortal} />
        <div className={styles.content} onClick={handleClick}>
          <pre>
            <code className="language-jsx">{children}</code>
          </pre>
          {isCopied && <div className={styles.copied}>Copied to clipboard</div>}
        </div>
      </div>,
      portalRef.current
    );
  }

  return null;
};

export default CompileModal;
