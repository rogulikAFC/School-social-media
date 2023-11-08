import "./ShareButton.css"

type ShareButtonProps = {
  blockName: string
  icon: string
  shareUrl: string
  dataAction: string | null
}

const ShareButton = ({blockName, icon, shareUrl, dataAction}: ShareButtonProps) => {
  return <a className={`share-button ${blockName}__share-button`} href={shareUrl} data-action={dataAction}>
    <img src={icon} />
  </a>
};

export default ShareButton;