import React, { useState, useEffect, useRef } from "react";

interface ViewportInfo {
  visualHeight: number;
  keyboardHeight: number;
}

interface KeyboardAvoidingContainerProps {
  body: React.ReactNode;
  footer: React.ReactNode;
  transitionDuration?: number;
}

const KeyboardAvoidingContainer: React.FC<KeyboardAvoidingContainerProps> = ({
  body,
  footer,
  transitionDuration = 280,
}) => {
  const [viewport, setViewport] = useState<ViewportInfo>({
    visualHeight: window.innerHeight,
    keyboardHeight: 0,
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const prevHeightRef = useRef<number>(window.innerHeight);

  const updateViewport = (immediate = false) => {
    const update = () => {
      const newVisualHeight =
        window.visualViewport?.height || window.innerHeight;
      const newKeyboardHeight = window.innerHeight - newVisualHeight;
      const isKeyboardOpen = newKeyboardHeight > 50; // threshold to detect keyboard

      if (newVisualHeight !== prevHeightRef.current) {
        setIsTransitioning(true);

        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }

        resizeTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false);
        }, transitionDuration);

        prevHeightRef.current = newVisualHeight;
      }

      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });

      setViewport({
        visualHeight: newVisualHeight,
        keyboardHeight: newKeyboardHeight,
      });

      if (lastFocusedElementRef.current && isKeyboardOpen) {
        handleFocusScroll(lastFocusedElementRef.current);
      }
    };

    if (immediate) {
      update();
    } else {
      requestAnimationFrame(update);
    }
  };

  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const events = [
      "scroll",
      "touchmove",
      "mousewheel",
      "DOMMouseScroll",
      "wheel",
    ];
    events.forEach((event) => {
      document.addEventListener(event, preventDefault, { passive: false });
      document.body.addEventListener(event, preventDefault, { passive: false });
      document.documentElement.addEventListener(event, preventDefault, {
        passive: false,
      });
    });

    const styles = {
      position: "fixed",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      maxHeight: "100%",
      margin: "0",
      padding: "0",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
    };
    Object.assign(document.body.style, styles);
    Object.assign(document.documentElement.style, styles);

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", (e) =>
        e.stopPropagation()
      );
      containerRef.current.addEventListener("touchmove", (e) =>
        e.stopPropagation()
      );
    }

    const handleResize = () => updateViewport();
    const handleOrientationChange = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        updateViewport(true);
        setTimeout(() => setIsTransitioning(false), transitionDuration);
      }, 100);
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("scroll", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    updateViewport(true);

    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      events.forEach((event) => {
        document.removeEventListener(event, preventDefault);
        document.body.removeEventListener(event, preventDefault);
        document.documentElement.removeEventListener(event, preventDefault);
      });

      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);

      document.body.style.cssText = "";
      document.documentElement.style.cssText = "";
    };
  }, []);

  const handleFocusScroll = (element: HTMLElement) => {
    if (!containerRef.current || !bodyRef.current || !element) return;

    const elementRect = element.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const scrollTop =
      elementRect.top - containerRect.top + containerRef.current.scrollTop - 60;

    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: Math.max(0, scrollTop),
          behavior: "smooth",
        });
      }

      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (e.target instanceof HTMLElement) {
      lastFocusedElementRef.current = e.target;
      handleFocusScroll(e.target);
      updateViewport(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!document.activeElement || document.activeElement === document.body) {
        lastFocusedElementRef.current = null;
        updateViewport(true);
      }
    }, 100);
  };

  const containerStyle: React.CSSProperties = {
    height: `${viewport.visualHeight}px`,
    WebkitOverflowScrolling: "touch",
    transition: isTransitioning
      ? `height ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
      : "none",
    willChange: isTransitioning ? "height" : "auto",
  };

  const bodyStyle: React.CSSProperties = {
    transition: isTransitioning
      ? `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
      : "none",
    willChange: isTransitioning ? "min-height, padding" : "auto",
  };

  return (
    <div
      className="fixed inset-0 w-full overflow-hidden"
      style={{
        height: "100vh",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        ref={containerRef}
        className="absolute inset-0 w-full overflow-auto overscroll-none"
        style={containerStyle}
      >
        <div
          ref={bodyRef}
          className="flex flex-col min-h-full px-6 pt-6"
          style={bodyStyle}
        >
          <div
            className="flex-1 pb-10"
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {body}
          </div>
          <div
            className="sticky bottom-0 left-0 right-0 w-full bg-white mt-auto pb-2"
            style={{
              transition: isTransitioning
                ? `transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
              willChange: isTransitioning ? "transform" : "auto",
            }}
          >
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardAvoidingContainer;
