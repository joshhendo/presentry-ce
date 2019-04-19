import { PassageContent } from "../bible-gateway-gateway";
import { BibleSection } from "../../../components/presentations/file-reader";
import { KonvaCommand } from "../../../interop/KonvaCommand";
import * as _ from "lodash";
import { settings } from "../../../interop/PresentationCommander";
import { supNums } from "../../../helpers/ScriptHelper";
import { getHeightOfTextObject } from "../../../helpers/KonvaHelper";


export function createSlides(passages: PassageContent[], opts?: any): BibleSection {
  const section: BibleSection = {
    title: 'passage title goes here',
    content: [],
    order: [],
  };

  let currentSlide: PassageContent[] = [];

  const currentCommand: Partial<KonvaCommand> = {
    type: 'text',
    action: 'create',
    data: {
      x: settings.bible_slide.lyric.LEFT_MARGIN,
      y: settings.bible_slide.lyric.TOP_MARGIN,
      text: '',
      fontSize: settings.bible_slide.lyric.MAX_SIZE,
      fontFamily: 'Calibri',
      width:
        settings.WIDTH -
        settings.bible_slide.lyric.LEFT_MARGIN -
        settings.bible_slide.lyric.RIGHT_MARGIN,
      padding: 20,
    },
  };

  const MAX_HEIGHT_FOR_BIBLE_PASSAGE = settings.HEIGHT
    - settings.bible_slide.lyric.TOP_MARGIN
    - settings.bible_slide.lyric.BOTTOM_MARGIN;

  let id = 0;

  for (let passageIndex = 0; passageIndex < passages.length; passageIndex++) {
    const passage = passages[passageIndex];
    currentCommand.data.text += `${supNums(passage.reference.verse.toString(10))} ${passage.text}`;
    currentSlide.push(passage);

    if (getHeightOfTextObject(currentCommand as KonvaCommand) > MAX_HEIGHT_FOR_BIBLE_PASSAGE || passageIndex === passages.length-1) {
      section.content.push({
        id: `${++id}`,
        passages: currentSlide
      });
      section.order.push(`${id}`);

      currentCommand.data.text = '';
      currentSlide = [];
    }
  }

  return section;
}