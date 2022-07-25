# FigmaJSX

본 프로젝트는 UI/UX 디자인 툴 Figma 에서 영감을 받아 시작되었습니다.

바닐라코딩에 들어오기 전, 취미로 Adobe XD 를 사용해 여러 UI 를 디자인 해왔기 때문에 웹에서 구동되는 Figma 를 색다른 방법으로 재구성 해보고 싶은 마음이 들었습니다.

# 메뉴
1. [FigmaJSX 사이트 바로가기](https://glittery-chaja-2128cf.netlify.app)
2. [사용한 기술](#사용한-기술)
3. [작업 일정](#작업-일정)
    1. [기획 및 기술 검증](#1-기획-및-기술-검증)
    2. [개발](#2-개발)
    3. [테스트](#3-테스트)
4. [어려웠던 점](#어려웠던-점)
5. [아쉬운 점](#아쉬운-점)
6. [프로젝트 트리 구조](#트리-구조)

# 사용한 기술
- React
- Redux-Toolkit
- Redux-Undo
- Webpack 5
- htmltojsx-too
- Sass
- Jest
- React Testing Library
- Cypress
- ES-Lint
- Husky

# 작업 일정 (6/21 ~ 7/15)
- 3 일: [기획 및 기술 검증](#1-기획-및-기술-검증)
- 15 일: [개발](#2-개발)
- 3 일: [테스트](#3-테스트)

# 1. 기획 및 기술 검증
Figma 와 유사한 툴을 만들기로 결정하고, 개발에 앞서 기능을 하나하나 검증해보며 개발 방향성을 잡았습니다.
### 디자인을 JSX 로 컴파일하는 기능을 위해 Canvas API 를 사용하지 않고 그림판 구현하기
Figma 와의 차별점으로는 유저의 디자인을 즉시 적용 가능한 JSX 로 컴파일 시켜주는 기능을 꼽을 수 있습니다. 컴파일 기능을 구현하기 위해 FigmaJSX 와 유사한 제품 [BuilderX.io](http://BuilderX.io) 를 개발해서 ReactEurope 에 소개한 인도네시아 개발자 ****Sanket Sahu**** 에게 트위터를 통해 연락을 취했고, 그에게서 Canvas API 를 사용하지 말라는 친절한 조언을 얻었습니다. 픽셀을 코드로 변환하는 것 보다 HTML 코드를 JSX 로 변환하는 것이 훨씬 간단하기 때문입니다.

그렇게 Canvas API 를 사용해 그림판을 구현한 Figma 와 달리 기본적인 HTML 태그를 사용해서 그림판을 구현하기로 결정했습니다.

### 디자인 작업 중 발생하는 리액트 렌더링을 최소화 하는 로직 구현하기
그림판 내부의 캔버스나 도형들을 모두 `div` 태그로 구현해야 하기 때문에 작업량이 많아질수록 HTML 파일의 크기가 커질 수 밖에 없고, 수시로 일어나는 리액트의 렌더링이 부담스러워질 수 밖에 없었습니다. 따라서 불필요한 렌더링을 방지하기 위해 최신 상태 관리 툴을 차용할 수 있었지만, 저는 Redux Toolkit 을 사용하기로 결정했습니다.

Redux 를 사용해 프로젝트를 진행하며 어떤 부분에서 어떻게 불필요한 렌더링이 일어나는지 직접 경험해보고 적절한 상태 관리 툴을 차용하는 것이 올바른 학습 방법이라고 생각했기 때문입니다.

### 작업 연속성 보장하기
이번 프로젝트 만큼은 온전히 프론트엔드에 집중하고 싶었기에 기획 단계에서 백엔드를 배제했습니다. 유저 인증과 DB 가 없는 상태에서도 작업의 연속성을 보장할 수 있도록 작업 파일을 로컬에 저장, 파일로 추출 및 불러오기 기능을 구현했습니다.

# 2. 개발
[칸반 보드](https://dapper-hovercraft-75d.notion.site/1b9c5110e84841a2bac715b6f5d4d209?v=f4d79629495c452f8e9a7c04105eeaaa)에 구현해야 할 기능들을 적어두고 계획에 맞춰 구현했습니다.

### 이벤트 관리
캔버스에서 이루어지는 모든 상호작용은 이벤트 핸들러가 처리합니다. 예를 들어 도형(네모)을 그리는 과정은 캔버스(배경)의 `mousedown` 이벤트에서 도형의 시작 좌표를 정의하고, `mousemove` 이벤트에서 시작 좌표로 부터 현재 커서의 위치를 계산해서 그려질 도형의 미리보기를 띄워줍니다. 마지막으로 `mouseup` 이벤트에서 최종 좌표를 정의해서 `top`, `left`, `height`, `width` 값을 스토어에 전달합니다. 

FigmaJSX 의 기능이 늘어나며 캔버스 위의 Node 마다 여러 이벤트가 중첩 되었고, 프로젝트 특성상 하나의 이벤트라도 제 때에 할당/제거 하지 않는 순간 유저 경험이 완전히 망가질 수 밖에 없었습니다. 하지만 그 덕분에 이벤트를 할당할 때면 리액트의 생애 주기를 떠올리며 불필요한 이벤트가 축적되는 것을 막을 수 있었습니다.

### 스냅 기능
모든 디자인 툴이 제공하는 기능 중 하나를 꼽자면 스냅 기능이 있습니다. 캔버스 위의 도형을 드래그하다 보면 주위의 다른 도형에 자석 처럼 붙어버리는 기능입니다. 이를 구현하기 위해 몇 개의 라이브러리 소스 코드를 읽어보며 공통된 핵심 로직을 파악할 수 있었습니다. 제가 이해한 바로는, 이들 모두 ****중력****이라는 개념을 도입해서 드래그 중인 도형으로 부터 가장 가까운 도형의 중력권에 진입하면 그 가까운 도형에 붙어버릴 수 있도록, 드래그 중인 도형의 `top`, `left` 값을 변경해 주었습니다. 이를 토대로 저만의 스냅 알고리즘을 구현해서 성공적으로 적용했습니다.

### 다중 선택 및 다중 편집
하나의 도형을 선택하면 해당 도형의 테두리에 8 개의 편집점이 생깁니다. 하지만 두 개 이상의 도형을 선택하면 선택된 모든 도형들을 아우르는 테두리에 편집점이 생겨야 합니다. 그리고 편집점을 드래그하면 모든 도형들이 같은 비율로 변형되야 하며, 내부의 영역을 드래그 하면 선택된 모든 도형들이 같은 비율로 움직여야 합니다.

이를 위해 다중 선택을 염두한 편집점 배치 알고리즘을 구현했으며, 다중 선택 시 선택된 모든 도형을 덮는 투명 `div` 를 만들어서 해당 `div` 에 필요한 이벤트를 할당하는 로직을 작성했습니다. 


https://user-images.githubusercontent.com/108341074/180770138-1b417508-a2e2-441f-ab11-e71220922d5c.mov


### JSX 컴파일
모든 드로잉 로직을 HTML 로 구현했기 때문에 유저의 디자인은 이미 HTML 코드로 완성된 상태입니다. JSX 로 컴파일 하는 과정은 유저가 "그린" HTML 코드를 JSX 로 바꿔주기만 하는 것입니다. 기획 단계에서는 컴파일 로직을 직접 구현할 생각이었지만, 막상 작업을 시작하려하니 따분한 문자열 파싱의 연속일 것 같아 라이브러리를 사용하기로 했습니다. 새로운 것을 최대한 많이 학습하기 위해 시작한 프로젝트였기에 학습에 불필요하다고 느껴지는 작업은 과감히 넘어갔습니다. 

컴파일 과정을 간단히 설명하자면 다음과 같습니다. HTML 코드를 즉시 적용 가능한 JSX 로 변환 될 수 있도록 필터링 한 다음, **htmltojsx-too** 라이브러리에 HTML 코드를 넣어 JSX 로 변환합니다. 출력된 JSX 코드를 **prettier/standalone** 라이브러리로 포맷팅 해서 유저에게 보여줍니다. 번들 사이즈를 줄이기 위해 두 개의 라이브러리는 dynamic import 로 가져옵니다.

```javascript
const compiler = async () => {
  dispatch(emptySelectedShapeIndexes());

  const { default: compileHtmlToJsx } = await import(
    "../../../utilities/compileHtmlToJsx"
  );
  const { default: prettifyCode } = await import(
    "../../../utilities/prettifyCode"
  );
  ...
}
```

# 3. 테스트
### 유닛 테스트
Jest 와 React Testing Library 를 사용해 **Atomic Design System** 의 Atom 에 해당하는 컴포넌트들의 유닛 테스트를 진행했습니다. 각 컴포넌트의 핵심 기능을 테스트 할 수 있도록 노력했습니다.

### 통합테스트
Cypress 를 사용해 유저가 그림을 그리는 과정을 시뮬레이션했습니다.  


https://user-images.githubusercontent.com/108341074/180771081-af7b8b1e-5b3c-4615-ba07-9c6816f3b7e9.mov


# 어려웠던 점
### 마우스 위치 기준 Zoom-in/Zoom-out
브라우저가 제공하는 기본 줌인 기능을 차단하고 유저가 스크롤 하거나 확대 단축키를 누를 경우 그림판의 `transform: scale()` 속성을 변경해주는 로직을 적용했지만, 추가적으로 마우스 위치를 중심으로 확대하는 기능을 구현하기 위해서는 정말 복잡한 계산이 필요했습니다. 이를 위해 웹의 수많은 예시를 참고했지만 본 프로젝트와 동일한 상황을 가정한 코드는 존재하지 않았기에 굉장히 힘든 시간을 보내며 알고리즘을 구현했습니다.

### Zoom 정도에 따른 좌표 값 보정
줌이 100% 일 때 도형을 그리면 정확히 마우스 커서의 위치에서 그림이 시작되지만, 줌인/줌아웃을 했다면 Scale 이 바뀌며 마우스 커서와 좌표의 위치가 틀어졌습니다. 따라서 이를 보정하는 알고리즘을 구현해야 했습니다.


https://user-images.githubusercontent.com/108341074/180769885-ff73d023-5460-4550-9581-2256167657dd.mov


### offset 속성을 사용하면 좌표가 튀는 문제
부모 요소가 미처 load 되지 못한 상황에 offset 속성을 사용하면 `x`, `y` 값이 0 으로 계산되는 경우가 있어 `clientX`, `clientY` 속성을 사용하는 것으로 해결했습니다.


https://user-images.githubusercontent.com/108341074/180770053-89fba8c0-6e25-4e82-af2a-591771e5ed19.mov


# 아쉬운 점
개발 후반부에 들어설 때 까지 리액트의 렌더링에만 신경을 쏟은 것이 못내 아쉽습니다. 기능 구현이 어느 정도 마무리 된 뒤에 렌더링 성능을 개선하고자 이것 저것 탐색하며 브라우저의 렌더링 과정에 대해서도 알게 되었습니다. **Critical Rendering Path** 에 대해 공부하고, 크롬의 **Performance Tool** 로 스트레스 테스트를 해보며 애니메이션에 의한 **Layout/Reflow** 를 방지하는 방법 등 여러가지 개선 점을 찾을 수 있었습니다. 하지만 이미 작업의 후반부에 들어선 상태였기 때문에 너무 많은 알고리즘을 바닥 부터 고쳐야 해서 짧은 시간 내에 고칠 수 있는 부분만 건드릴 수 밖에 없었습니다. 

다만 앞으로 어느 작업을 하건 리액트의 렌더링 뿐만 아니라 브라우저의 렌더링 원리까지 고민하며 작업할 수 있게 되어서 **만족스러운 학습 경험**이었다고 자신있게 말할 수 있습니다.


# 프로젝트 구조
<details>
<summary>
Tree 구조 보기
</summary>

```
.
├── cypress
│   ├── downloads
│   ├── e2e
│   │   └── Home.cy.js
│   └── support
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── dist
├── jest.config.js
├── package-lock.json
├── package.json
├── public
│   ├── assets
│   │   ├── favicon
│   │   │   ├── android-chrome-192x192.png
│   │   │   ├── android-chrome-512x512.png
│   │   │   ├── apple-touch-icon.png
│   │   │   ├── browserconfig.xml
│   │   │   ├── favicon-16x16.png
│   │   │   ├── favicon-32x32.png
│   │   │   ├── favicon.ico
│   │   │   ├── mstile-150x150.png
│   │   │   └── safari-pinned-tab.svg
│   │   ├── icon-canvas.svg
│   │   ├── tool-ellipse.png
│   │   ├── tool-line.svg
│   │   ├── tool-rectangle.png
│   │   ├── tool-selector.png
│   │   └── tool-text.svg
│   └── index.html
├── setUpTests.js
├── src
│   ├── App
│   │   └── index.js
│   ├── components
│   │   ├── atoms
│   │   │   ├── ArtBoard
│   │   │   │   ├── ArtBoard.module.scss
│   │   │   │   ├── ArtBoard.spec.js
│   │   │   │   └── index.js
│   │   │   ├── AutoSaveButton
│   │   │   │   ├── AutoSaveButton.module.scss
│   │   │   │   ├── AutoSaveButton.spec.js
│   │   │   │   └── index.js
│   │   │   ├── Canvas
│   │   │   │   ├── Canvas.module.scss
│   │   │   │   ├── Canvas.spec.js
│   │   │   │   └── index.js
│   │   │   ├── ColorPicker
│   │   │   │   ├── ColorPicker.module.scss
│   │   │   │   ├── ColorPicker.spec.js
│   │   │   │   └── index.js
│   │   │   ├── CompileButton
│   │   │   │   ├── CompileButton.module.scss
│   │   │   │   └── index.js
│   │   │   ├── CompileModal
│   │   │   │   ├── CompileModal.module.scss
│   │   │   │   └── index.js
│   │   │   ├── DropDownMenu
│   │   │   │   ├── DropDownMenu.module.scss
│   │   │   │   ├── DropDownMenu.spec.js
│   │   │   │   └── index.js
│   │   │   ├── EditPointer
│   │   │   │   ├── EditPointer.spec.js
│   │   │   │   └── index.js
│   │   │   ├── ErrorDescriptionText
│   │   │   │   ├── ErrorDescriptionText.module.scss
│   │   │   │   ├── ErrorDescriptionText.spec.js
│   │   │   │   └── index.js
│   │   │   ├── ErrorTitleText
│   │   │   │   ├── ErrorTitleText.module.scss
│   │   │   │   └── index.js
│   │   │   ├── ExportButton
│   │   │   │   ├── ExportButton.module.scss
│   │   │   │   ├── ExportButton.spec.js
│   │   │   │   └── index.js
│   │   │   ├── FigureInput
│   │   │   │   ├── FigureInput.module.scss
│   │   │   │   ├── FigureInput.spec.js
│   │   │   │   └── index.js
│   │   │   ├── FontSizeInputField
│   │   │   │   ├── FontSizeInputField.module.scss
│   │   │   │   ├── FontSizeInputField.spec.js
│   │   │   │   └── index.js
│   │   │   ├── HorizontalLine
│   │   │   │   ├── HorizontalLine.module.scss
│   │   │   │   └── index.js
│   │   │   ├── ImportButton
│   │   │   │   ├── ImportButton.module.scss
│   │   │   │   └── index.js
│   │   │   ├── NewCanvasText
│   │   │   │   ├── NewCanvasText.module.scss
│   │   │   │   ├── NewCanvasText.spec.js
│   │   │   │   └── index.js
│   │   │   ├── NewProjectButton
│   │   │   │   ├── NewProjectButton.module.scss
│   │   │   │   ├── NewProjectButton.spec.js
│   │   │   │   └── index.js
│   │   │   ├── ProjectTitleInput
│   │   │   │   ├── ProjectTitleInput.module.scss
│   │   │   │   ├── ProjectTitleInput.spec.js
│   │   │   │   └── index.js
│   │   │   ├── Shape
│   │   │   │   ├── Shape.module.scss
│   │   │   │   ├── Shape.spec.js
│   │   │   │   └── index.js
│   │   │   ├── ShapeLayer
│   │   │   │   ├── ShapeLayer.module.scss
│   │   │   │   ├── ShapeLayer.spec.js
│   │   │   │   └── index.js
│   │   │   ├── ShapeText
│   │   │   │   ├── ShapeText.module.scss
│   │   │   │   ├── ShapeText.spec.js
│   │   │   │   └── index.js
│   │   │   ├── SideBar
│   │   │   │   ├── SideBar.module.scss
│   │   │   │   └── index.js
│   │   │   ├── ThicknessInputField
│   │   │   │   ├── ThicknessInputField.module.scss
│   │   │   │   ├── ThicknessInputField.spec.js
│   │   │   │   └── index.js
│   │   │   ├── TitleText
│   │   │   │   ├── TitleText.module.scss
│   │   │   │   └── index.js
│   │   │   └── ToolBox
│   │   │       ├── MockToolBox.js
│   │   │       ├── ToolBox.module.scss
│   │   │       ├── ToolBox.spec.js
│   │   │       └── index.js
│   │   ├── molecules
│   │   │   ├── CanvasLayers
│   │   │   │   └── index.js
│   │   │   ├── FontSizeInputBox
│   │   │   │   ├── FontSizeInputBox.module.scss
│   │   │   │   └── index.js
│   │   │   ├── Header
│   │   │   │   ├── Header.module.scss
│   │   │   │   └── index.js
│   │   │   ├── NewCanvasButton
│   │   │   │   ├── NewCanvasButton.module.scss
│   │   │   │   └── index.js
│   │   │   ├── ShapeFigures
│   │   │   │   ├── ShapeFigures.module.scss
│   │   │   │   └── index.js
│   │   │   ├── ThicknessInputBox
│   │   │   │   ├── ThicknessInputBox.module.scss
│   │   │   │   └── index.js
│   │   │   └── ToolPreset
│   │   │       ├── ToolPreset.module.scss
│   │   │       └── index.js
│   │   ├── organisms
│   │   │   ├── LeftSideBar
│   │   │   │   └── index.js
│   │   │   └── RightSideBar
│   │   │       └── index.js
│   │   ├── pages
│   │   │   ├── ErrorPage
│   │   │   │   ├── ErrorPage.module.scss
│   │   │   │   └── index.js
│   │   │   └── WorkbenchPage
│   │   │       ├── WorkbenchPage.module.scss
│   │   │       └── index.js
│   │   └── scss
│   │       ├── _colors.scss
│   │       ├── _fonts.scss
│   │       ├── _forwards.scss
│   │       ├── _mixins.scss
│   │       └── _variables.scss
│   ├── constants
│   │   ├── directions.js
│   │   ├── errors.js
│   │   ├── figures.js
│   │   ├── localStorage.js
│   │   ├── shortcuts.js
│   │   ├── styles.js
│   │   └── tools.js
│   ├── features
│   │   ├── canvas
│   │   │   └── canvasSlice.js
│   │   ├── globalStyles
│   │   │   └── globalStylesSlice.js
│   │   └── utility
│   │       └── utilitySlice.js
│   ├── hooks
│   │   ├── useDragCanvas.js
│   │   ├── useDragMultipleShapes.js
│   │   ├── useDragShape.js
│   │   ├── useDragToResize.js
│   │   ├── useDragToScroll.js
│   │   ├── useDrawCanvas.js
│   │   ├── useDrawShape.js
│   │   ├── useGlobalKeyboardShortCut.js
│   │   └── useMockZoom.js
│   ├── index.js
│   ├── prism.css
│   ├── store
│   │   └── configureStore.js
│   ├── styles.scss
│   ├── test-utils
│   │   ├── mockStates.js
│   │   └── wrappedRender.js
│   └── utilities
│       ├── batchActions.js
│       ├── compileHtmlToJsx.js
│       ├── computeIntersection.js
│       ├── computeMockZoom.js
│       ├── computePreviewElement.js
│       ├── computePreviewLine.js
│       ├── computeSelectionBox.js
│       ├── computeSnapPosition.js
│       ├── defaultEventListeners.js
│       ├── prettifyCode.js
│       ├── translateFigure.js
│       └── wait.js
└── webpack.config.js
```

</details>
