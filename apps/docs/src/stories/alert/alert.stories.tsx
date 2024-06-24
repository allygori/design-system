import { useState } from "react";
import * as Alert from "@allygory/alert";
import {
  triggerClass,
  overlayClass,
  contentClass,
  titleClass,
  descriptionClass,
  actionClass,
  cancelClass,
  chromaticContentClass,
  triggerAttrClass,
  overlayAttrClass,
  contentAttrClass,
  titleAttrClass,
  descriptionAttrClass,
  actionAttrClass,
  cancelAttrClass,
} from "./styles.css";

export default { title: "Components/Alert" };

export const Styled = () => (
  <Alert.Root>
    <Alert.Trigger className={triggerClass}>delete everything</Alert.Trigger>
    <Alert.Portal>
      <Alert.Overlay className={overlayClass} />
      <Alert.Content className={contentClass}>
        <Alert.Title className={titleClass}>Are you sure?</Alert.Title>
        <Alert.Description className={descriptionClass}>
          This will do a very dangerous thing. Thar be dragons!
        </Alert.Description>
        <Alert.Action className={actionClass}>yolo, do it</Alert.Action>
        <Alert.Cancel className={cancelClass}>maybe not</Alert.Cancel>
      </Alert.Content>
    </Alert.Portal>
  </Alert.Root>
);

export const Controlled = () => {
  const [open, setOpen] = useState(false);
  const [housePurchased, setHousePurchased] = useState(false);

  return (
    <div>
      <div>
        <img
          src="https://i.ibb.co/K54hsKt/house.jpg"
          alt="a large white house with a red roof"
        />
      </div>
      <Alert.Root open={open} onOpenChange={setOpen}>
        <Alert.Trigger
          onClick={(e) => {
            if (housePurchased) {
              e.preventDefault();
              setHousePurchased(false);
            }
          }}
        >
          {housePurchased ? "You bought the house! Sell it!" : "Buy this house"}
        </Alert.Trigger>
        <Alert.Portal>
          <Alert.Overlay className={overlayClass} />
          <Alert.Content className={contentClass}>
            <Alert.Title>Are you sure?</Alert.Title>
            <Alert.Description>
              Houses are very expensive and it looks like you only have €20 in
              the bank. Maybe consult with a financial advisor?
            </Alert.Description>
            <Alert.Action
              className={actionClass}
              onClick={() => setHousePurchased(true)}
            >
              buy it anyway
            </Alert.Action>
            <Alert.Cancel className={cancelClass}>
              good point, I'll reconsider
            </Alert.Cancel>
          </Alert.Content>
        </Alert.Portal>
      </Alert.Root>
    </div>
  );
};

export const Chromatic = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
      height: "100vh",
    }}
  >
    <div>
      <h1>Uncontrolled</h1>
      <h2>Closed</h2>
      <Alert.Root>
        <Alert.Trigger className={triggerClass}>
          delete everything
        </Alert.Trigger>
        <Alert.Portal>
          <Alert.Overlay className={overlayClass} />
          <Alert.Content className={chromaticContentClass}>
            <Alert.Title className={titleClass}>Title</Alert.Title>
            <Alert.Description className={descriptionClass}>
              Description
            </Alert.Description>
            <Alert.Action className={actionClass}>Confirm</Alert.Action>
            <Alert.Cancel className={cancelClass}>Cancel</Alert.Cancel>
          </Alert.Content>
        </Alert.Portal>
      </Alert.Root>

      <h2>Open</h2>
      <Alert.Root defaultOpen>
        <Alert.Trigger className={triggerClass}>
          delete everything
        </Alert.Trigger>
        <Alert.Portal>
          <Alert.Overlay
            className={overlayClass}
            style={{ left: 0, bottom: "50%", width: "25%" }}
          />
          <Alert.Content
            className={chromaticContentClass}
            style={{ top: "25%", left: "12%" }}
          >
            <Alert.Title className={titleClass}>Title</Alert.Title>
            <Alert.Description className={descriptionClass}>
              Description
            </Alert.Description>
            <Alert.Action className={actionClass}>Confirm</Alert.Action>
            <Alert.Cancel className={cancelClass}>Cancel</Alert.Cancel>
          </Alert.Content>
        </Alert.Portal>
      </Alert.Root>
    </div>

    <div>
      <h1>Uncontrolled with reordered parts</h1>
      <h2>Closed</h2>
      <Alert.Root>
        <Alert.Portal>
          <Alert.Overlay className={overlayClass} />
          <Alert.Content className={chromaticContentClass}>
            <Alert.Title className={titleClass}>Title</Alert.Title>
            <Alert.Description className={descriptionClass}>
              Description
            </Alert.Description>
            <Alert.Action className={actionClass}>Confirm</Alert.Action>
            <Alert.Cancel className={cancelClass}>Cancel</Alert.Cancel>
          </Alert.Content>
        </Alert.Portal>
        <Alert.Trigger className={triggerClass}>
          delete everything
        </Alert.Trigger>
      </Alert.Root>

      <h2>Open</h2>
      <Alert.Root defaultOpen>
        <Alert.Portal>
          <Alert.Overlay
            className={overlayClass}
            style={{ left: "25%", bottom: "50%", width: "25%" }}
          />
          <Alert.Content
            className={chromaticContentClass}
            style={{ top: "25%", left: "37%" }}
          >
            <Alert.Title className={titleClass}>Title</Alert.Title>
            <Alert.Description className={descriptionClass}>
              Description
            </Alert.Description>
            <Alert.Action className={actionClass}>Confirm</Alert.Action>
            <Alert.Cancel className={cancelClass}>Cancel</Alert.Cancel>
          </Alert.Content>
        </Alert.Portal>
        <Alert.Trigger className={triggerClass}>
          delete everything
        </Alert.Trigger>
      </Alert.Root>
    </div>

    <div>
      <h1>Controlled</h1>
      <h2>Closed</h2>
      <Alert.Root open={false}>
        <Alert.Trigger className={triggerClass}>
          delete everything
        </Alert.Trigger>
        <Alert.Portal>
          <Alert.Overlay className={overlayClass} />
          <Alert.Content className={chromaticContentClass}>
            <Alert.Title className={titleClass}>Title</Alert.Title>
            <Alert.Description className={descriptionClass}>
              Description
            </Alert.Description>
            <Alert.Action className={actionClass}>Confirm</Alert.Action>
            <Alert.Cancel className={cancelClass}>Cancel</Alert.Cancel>
          </Alert.Content>
        </Alert.Portal>
      </Alert.Root>

      <h2>Open</h2>
      <Alert.Root open>
        <Alert.Trigger className={triggerClass}>
          delete everything
        </Alert.Trigger>
        <Alert.Portal>
          <Alert.Overlay
            className={overlayClass}
            style={{ left: "50%", bottom: "50%", width: "25%" }}
          />
          <Alert.Content
            className={chromaticContentClass}
            style={{ top: "25%", left: "62%" }}
          >
            <Alert.Title className={titleClass}>Title</Alert.Title>
            <Alert.Description className={descriptionClass}>
              Description
            </Alert.Description>
            <Alert.Action className={actionClass}>Confirm</Alert.Action>
            <Alert.Cancel className={cancelClass}>Cancel</Alert.Cancel>
          </Alert.Content>
        </Alert.Portal>
      </Alert.Root>
    </div>

    <div>
      <h1>Controlled with reordered parts</h1>
      <h2>Closed</h2>
      <Alert.Root open={false}>
        <Alert.Portal>
          <Alert.Overlay className={overlayClass} />
          <Alert.Content className={chromaticContentClass}>
            <Alert.Title className={titleClass}>Title</Alert.Title>
            <Alert.Description className={descriptionClass}>
              Description
            </Alert.Description>
            <Alert.Action className={actionClass}>Confirm</Alert.Action>
            <Alert.Cancel className={cancelClass}>Cancel</Alert.Cancel>
          </Alert.Content>
        </Alert.Portal>
        <Alert.Trigger className={triggerClass}>
          delete everything
        </Alert.Trigger>
      </Alert.Root>

      <h2>Open</h2>
      <Alert.Root open>
        <Alert.Portal>
          <Alert.Overlay
            className={overlayClass}
            style={{ left: "75%", bottom: "50%", width: "25%" }}
          />
          <Alert.Content
            className={chromaticContentClass}
            style={{ top: "25%", left: "88%" }}
          >
            <Alert.Title className={titleClass}>Title</Alert.Title>
            <Alert.Description className={descriptionClass}>
              Description
            </Alert.Description>
            <Alert.Action className={actionClass}>Confirm</Alert.Action>
            <Alert.Cancel className={cancelClass}>Cancel</Alert.Cancel>
          </Alert.Content>
        </Alert.Portal>
        <Alert.Trigger className={triggerClass}>
          delete everything
        </Alert.Trigger>
      </Alert.Root>
    </div>

    <div>
      <h1>State attributes</h1>
      <h2>Closed</h2>
      <Alert.Root>
        <Alert.Trigger className={triggerAttrClass}>
          delete everything
        </Alert.Trigger>
        <Alert.Portal>
          <Alert.Overlay className={overlayAttrClass} />
          <Alert.Content className={contentAttrClass}>
            <Alert.Title className={titleAttrClass}>Title</Alert.Title>
            <Alert.Description className={descriptionAttrClass}>
              Description
            </Alert.Description>
            <Alert.Action className={actionAttrClass}>Confirm</Alert.Action>
            <Alert.Cancel className={cancelAttrClass}>Cancel</Alert.Cancel>
          </Alert.Content>
        </Alert.Portal>
      </Alert.Root>

      <h2>Open</h2>
      <Alert.Root defaultOpen>
        <Alert.Trigger className={triggerAttrClass}>
          delete everything
        </Alert.Trigger>
        <Alert.Portal>
          <Alert.Overlay className={overlayAttrClass} style={{ top: "50%" }} />
          <Alert.Content className={contentAttrClass} style={{ top: "75%" }}>
            <Alert.Title className={titleAttrClass}>Title</Alert.Title>
            <Alert.Description className={descriptionAttrClass}>
              Description
            </Alert.Description>
            <Alert.Action className={actionAttrClass}>Confirm</Alert.Action>
            <Alert.Cancel className={cancelAttrClass}>Cancel</Alert.Cancel>
          </Alert.Content>
        </Alert.Portal>
      </Alert.Root>
    </div>
  </div>
);

Chromatic.parameters = { chromatic: { disable: false } };
