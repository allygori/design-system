import { ComponentProps, useEffect, useRef, useState } from "react";
import * as Dialog from "@allygory/dialog";
import * as Toast from "@allygory/toast";
import {
  animatedRootClass,
  buttonClass,
  chromaticViewport,
  closeClass,
  descriptionClass,
  errorRootClass,
  headerClass,
  progressBarClass,
  progressBarInnerClass,
  rootClass,
  successHeaderClass,
  titleClass,
  viewportClass,
} from "./styles.css";

export default { title: "Components/Toast" };

export const Styled = () => (
  <Toast.Provider>
    <ToastUpgradeAvailable />
    <Toast.Viewport className={viewportClass} />
  </Toast.Provider>
);

export const Controlled = () => {
  const [hasUpgrade, setHasUpgrade] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    if (!hasUpgrade) {
      const timer = window.setTimeout(() => setHasUpgrade(true), 10000);
      return () => window.clearTimeout(timer);
    }
  }, [hasUpgrade]);

  return (
    <Toast.Provider>
      <button onClick={() => setIsSubscribed(true)}>subscribe</button>
      <button onClick={() => setErrorCount((count) => count + 1)}>error</button>
      <button onClick={() => setSavedCount((count) => count + 1)}>save</button>
      <ToastUpgradeAvailable open={hasUpgrade} onOpenChange={setHasUpgrade} />
      <ToastSubscribeSuccess
        open={isSubscribed}
        onOpenChange={setIsSubscribed}
      />

      {[...Array(errorCount)].map((_, index) => (
        <Toast.Root key={index} className={errorRootClass}>
          <Toast.Description>There was an error</Toast.Description>
          <Toast.Action
            className={buttonClass}
            altText="Resubmit the form to try again."
            onClick={() => console.log("try again")}
          >
            Try again
          </Toast.Action>
        </Toast.Root>
      ))}

      {[...Array(savedCount)].map((_, index) => (
        <Toast.Root key={index} className={rootClass}>
          <Toast.Description>Successfully saved</Toast.Description>
        </Toast.Root>
      ))}

      <Toast.Viewport className={viewportClass} />
    </Toast.Provider>
  );
};

export const FromDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Toast.Provider>
      <Dialog.Root>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Overlay />
        <Dialog.Content
          style={{ border: "1px solid", width: 300, padding: 30 }}
        >
          <Dialog.Title style={{ margin: 0 }}>Title</Dialog.Title>
          <Dialog.Description>Description</Dialog.Description>
          <button onClick={() => setOpen(true)}>Open toast</button>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>

      <Toast.Root open={open} onOpenChange={setOpen} className={errorRootClass}>
        <Toast.Description>There was an error</Toast.Description>
        <Toast.Action
          className={buttonClass}
          altText="Resubmit the form to try again."
          onClick={() => console.log("try again")}
        >
          Try again
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className={viewportClass} />
    </Toast.Provider>
  );
};

export const Promise = () => {
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (saving) {
      const timer = window.setTimeout(() => setSaving(false), 2000);
      return () => window.clearTimeout(timer);
    }
  }, [saving]);

  return (
    <Toast.Provider>
      <form
        onSubmit={(event) => {
          setSaving(true);
          setOpen(true);
          event.preventDefault();
        }}
      >
        <button>Save</button>
        <Toast.Root
          className={rootClass}
          duration={saving ? Infinity : 2000}
          open={open}
          onOpenChange={setOpen}
        >
          {saving ? (
            <Toast.Description>Saving&hellip;</Toast.Description>
          ) : (
            <Toast.Description>Saved!</Toast.Description>
          )}
        </Toast.Root>
      </form>

      <Toast.Viewport className={viewportClass} />
    </Toast.Provider>
  );
};

export const KeyChange = () => {
  const [toastOneCount, setToastOneCount] = useState(0);
  const [toastTwoCount, setToastTwoCount] = useState(0);

  return (
    <Toast.Provider>
      <button onClick={() => setToastOneCount((count) => count + 1)}>
        Open toast one
      </button>
      <button onClick={() => setToastTwoCount((count) => count + 1)}>
        Open toast two
      </button>

      {toastOneCount > 0 && (
        <Toast.Root key={"one-" + String(toastOneCount)} className={rootClass}>
          <Toast.Description>Toast one</Toast.Description>
        </Toast.Root>
      )}

      {toastTwoCount > 0 && (
        <Toast.Root key={"two-" + String(toastTwoCount)} className={rootClass}>
          <Toast.Description>Toast two</Toast.Description>
        </Toast.Root>
      )}

      <Toast.Viewport className={viewportClass} />
    </Toast.Provider>
  );
};

export const PauseResumeProps = () => {
  const [toastCount, setToastCount] = useState(0);

  return (
    <Toast.Provider>
      <button onClick={() => setToastCount((count) => count + 1)}>
        Add toast
      </button>

      {[...Array(toastCount)].map((_, index) => (
        <ToastWithProgress key={index} />
      ))}

      <Toast.Viewport className={viewportClass} />
    </Toast.Provider>
  );
};

type Direction = ComponentProps<typeof Toast.Provider>["swipeDirection"];

export const Animated = () => {
  const [open, setOpen] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<Direction>("right");
  const timerRef = useRef(0);
  return (
    <Toast.Provider
      swipeDirection={swipeDirection}
      swipeThreshold={
        (["up", "down"] as Direction[]).includes(swipeDirection)
          ? 25
          : undefined
      }
    >
      <button
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => setOpen(true), 150);
        }}
      >
        Open
      </button>
      <select
        value={swipeDirection}
        onChange={(event) => {
          setSwipeDirection(event.currentTarget.value as Direction);
        }}
      >
        <option value="right">Slide right</option>
        <option value="left">Slide left</option>
        <option value="up">Slide up</option>
        <option value="down">Slide down</option>
      </select>
      <Toast.Root
        className={animatedRootClass}
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Description>Swipe me {swipeDirection}</Toast.Description>
        <Toast.Close className={buttonClass}>Dismiss</Toast.Close>
      </Toast.Root>
      <Toast.Viewport className={viewportClass} />
    </Toast.Provider>
  );
};

export const Cypress = () => {
  const [count, setCount] = useState(0);

  return (
    <Toast.Provider>
      <button onClick={() => setCount((count) => count + 1)}>Add toast</button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 700,
          margin: "auto",
        }}
      >
        <button>Focusable before viewport</button>

        {[...Array(count)].map((_, index) => {
          const identifier = index + 1;
          return (
            <Toast.Root
              key={index}
              open
              className={rootClass}
              data-testid={`toast-${identifier}`}
            >
              <Toast.Title className={titleClass}>
                Toast {identifier} title
              </Toast.Title>
              <Toast.Description className={descriptionClass}>
                Toast {identifier} description
              </Toast.Description>

              <Toast.Close className={buttonClass} aria-label="Close">
                Toast button {identifier}.1
              </Toast.Close>
              <Toast.Action
                altText="Go and perform an action"
                className={buttonClass}
                style={{ marginTop: 10 }}
              >
                Toast button {identifier}.2
              </Toast.Action>
            </Toast.Root>
          );
        })}
        <Toast.Viewport className={viewportClass} />

        <button>Focusable after viewport</button>
      </div>
    </Toast.Provider>
  );
};

const SNAPSHOT_DELAY = 300;
export const Chromatic = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <h1>Order</h1>
      <Toast.Provider duration={Infinity}>
        <Toast.Root className={rootClass}>
          <div className={headerClass}>
            <Toast.Title className={titleClass}>Toast 1</Toast.Title>
            <Toast.Close className={closeClass}>×</Toast.Close>
          </div>
          <Toast.Description className={descriptionClass}>
            Description
          </Toast.Description>
          <Toast.Action
            altText="alternative"
            className={buttonClass}
            style={{ marginTop: 10 }}
          >
            Action
          </Toast.Action>
        </Toast.Root>
        <Toast.Root className={rootClass}>
          <div className={headerClass}>
            <Toast.Title className={titleClass}>Toast 2</Toast.Title>
            <Toast.Close className={closeClass}>×</Toast.Close>
          </div>
          <Toast.Description className={descriptionClass}>
            Description
          </Toast.Description>
          <Toast.Action
            altText="alternative"
            className={buttonClass}
            style={{ marginTop: 10 }}
          >
            Action
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className={chromaticViewport}></Toast.Viewport>
      </Toast.Provider>

      <h1>Uncontrolled</h1>

      <h2>Open</h2>
      <Toast.Provider>
        <Toast.Root duration={Infinity} className={rootClass}>
          <div className={headerClass}>
            <Toast.Title className={titleClass}>Toast</Toast.Title>
            <Toast.Close className={closeClass}>×</Toast.Close>
          </div>
          <Toast.Description className={descriptionClass}>
            Description
          </Toast.Description>
          <Toast.Action
            altText="alternative"
            className={buttonClass}
            style={{ marginTop: 10 }}
          >
            Action
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className={chromaticViewport}></Toast.Viewport>
      </Toast.Provider>

      <h2>Closed</h2>
      <Toast.Provider>
        <Toast.Root
          defaultOpen={false}
          duration={Infinity}
          className={rootClass}
        >
          <div className={headerClass}>
            <Toast.Title className={titleClass}>Title</Toast.Title>
            <Toast.Close className={closeClass}>×</Toast.Close>
          </div>
          <Toast.Description className={descriptionClass}>
            Uncontrolled foreground closed
          </Toast.Description>
          <Toast.Action
            altText="alternative"
            className={buttonClass}
            style={{ marginTop: 10 }}
          >
            Action
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className={chromaticViewport}></Toast.Viewport>
      </Toast.Provider>

      <h1>Controlled</h1>

      <h2>Open</h2>
      <Toast.Provider>
        <Toast.Root open duration={Infinity} className={rootClass}>
          <div className={headerClass}>
            <Toast.Title className={titleClass}>Toast</Toast.Title>
            <Toast.Close className={closeClass}>×</Toast.Close>
          </div>
          <Toast.Description className={descriptionClass}>
            Description
          </Toast.Description>
          <Toast.Action
            altText="alternative"
            className={buttonClass}
            style={{ marginTop: 10 }}
          >
            Action
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className={chromaticViewport}></Toast.Viewport>
      </Toast.Provider>

      <h2>Closed</h2>
      <Toast.Provider>
        <Toast.Root open={false} duration={Infinity} className={rootClass}>
          <div className={headerClass}>
            <Toast.Title className={titleClass}>Toast</Toast.Title>
            <Toast.Close className={closeClass}>×</Toast.Close>
          </div>
          <Toast.Description className={descriptionClass}>
            Description
          </Toast.Description>
          <Toast.Action
            altText="alternative"
            className={buttonClass}
            style={{ marginTop: 10 }}
          >
            Action
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className={chromaticViewport}></Toast.Viewport>
      </Toast.Provider>

      <h1>Dismissed</h1>
      <h2>Uncontrolled</h2>
      <Toast.Provider>
        <Toast.Root duration={SNAPSHOT_DELAY - 100} className={rootClass}>
          <div className={headerClass}>
            <Toast.Title className={titleClass}>Toast</Toast.Title>
            <Toast.Close className={closeClass}>×</Toast.Close>
          </div>
          <Toast.Description className={descriptionClass}>
            Description
          </Toast.Description>
          <Toast.Action
            altText="alternative"
            className={buttonClass}
            style={{ marginTop: 10 }}
          >
            Action
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className={chromaticViewport}></Toast.Viewport>
      </Toast.Provider>

      <h2>Controlled</h2>
      <Toast.Provider>
        <Toast.Root
          duration={SNAPSHOT_DELAY - 100}
          open={open}
          onOpenChange={setOpen}
          className={rootClass}
        >
          <div className={headerClass}>
            <Toast.Title className={titleClass}>Toast</Toast.Title>
            <Toast.Close className={closeClass}>×</Toast.Close>
          </div>
          <Toast.Description className={descriptionClass}>
            Description
          </Toast.Description>
          <Toast.Action
            altText="alternative"
            className={buttonClass}
            style={{ marginTop: 10 }}
          >
            Action
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className={chromaticViewport}></Toast.Viewport>
      </Toast.Provider>

      <h1>Provider</h1>
      <h2>Duration</h2>
      <Toast.Provider duration={SNAPSHOT_DELAY - 100}>
        <Toast.Root className={rootClass}>
          <div className={headerClass}>
            <Toast.Title className={titleClass}>Toast</Toast.Title>
            <Toast.Close className={closeClass}>×</Toast.Close>
          </div>
          <Toast.Description className={descriptionClass}>
            Description
          </Toast.Description>
          <Toast.Action
            altText="alternative"
            className={buttonClass}
            style={{ marginTop: 10 }}
          >
            Action
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className={chromaticViewport}></Toast.Viewport>
      </Toast.Provider>

      <h2>Duration overidden</h2>
      <Toast.Provider duration={Infinity}>
        <Toast.Root duration={SNAPSHOT_DELAY - 100} className={rootClass}>
          <div className={headerClass}>
            <Toast.Title className={titleClass}>Toast</Toast.Title>
            <Toast.Close className={closeClass}>×</Toast.Close>
          </div>
          <Toast.Description className={descriptionClass}>
            Description
          </Toast.Description>
          <Toast.Action
            altText="alternative"
            className={buttonClass}
            style={{ marginTop: 10 }}
          >
            Action
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className={chromaticViewport}></Toast.Viewport>
      </Toast.Provider>
    </>
  );
};
Chromatic.parameters = { chromatic: { disable: false, delay: SNAPSHOT_DELAY } };

/* -----------------------------------------------------------------------------------------------*/

const ToastUpgradeAvailable = (props: ComponentProps<typeof Toast.Root>) => (
  <Toast.Root className={rootClass} {...props}>
    <div className={headerClass}>
      <Toast.Title className={titleClass}>Upgrade available</Toast.Title>
      <Toast.Close className={closeClass} aria-label="Close">
        <span aria-hidden>×</span>
      </Toast.Close>
    </div>
    <Toast.Description className={descriptionClass}>
      We've just released Radix version 3.0
    </Toast.Description>
    <Toast.Action
      altText="Goto account settings to upgrade"
      className={buttonClass}
      style={{ marginTop: 10 }}
    >
      Upgrade
    </Toast.Action>
  </Toast.Root>
);

const ToastSubscribeSuccess = (props: ComponentProps<typeof Toast.Root>) => (
  <Toast.Root className={rootClass} {...props}>
    <div className={successHeaderClass}>
      <Toast.Title className={titleClass}>Success!</Toast.Title>
      <Toast.Close className={closeClass} aria-label="Close">
        <span aria-hidden>×</span>
      </Toast.Close>
    </div>
    <Toast.Description className={descriptionClass}>
      You have subscribed. We'll be in touch.
    </Toast.Description>
  </Toast.Root>
);

const ToastWithProgress = (props: ComponentProps<typeof Toast.Root>) => {
  const [paused, setPaused] = useState(false);
  const duration = 3000;

  return (
    <Toast.Root
      className={rootClass}
      duration={duration}
      onPause={() => setPaused(true)}
      onResume={() => setPaused(false)}
      {...props}
    >
      <Toast.Description>Successfully saved</Toast.Description>
      <div className={progressBarClass}>
        <div
          className={progressBarInnerClass}
          style={{
            animationDuration: duration - 100 + "ms",
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      </div>
    </Toast.Root>
  );
};
