import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <div>
      <h1 class={classNames(displayClass, "page-title")}>
        <a href={baseDir}>{title}</a>
      </h1>
      <h4 class="go-back"><a href="/main/index.html">back to personal site home</a></h4>
    </div>
    <div>
      <h1 class={classNames(displayClass, "page-title")}>
        <a href={baseDir}>{title}</a>
      </h1>
      <h4 class="go-back"><a href="/main/index.html">back to personal site home</a></h4>
    </div>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  padding: 0;
  font-family: var(--titleFont);
}

.go-back {
  margin: 0;
  padding: 0;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
