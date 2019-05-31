import { TemplateRef } from '@angular/core';

import { GenericQuestion } from './generic_question';
import Track from './track';
import QuestionType from './types';


export interface Question {
  id: number;
  type: QuestionType;
  track: Track;
  title?: string;
  description?: string;
  answer?: any;
  correctAnswer?: any;
  answered?: boolean;
  wasCorrect?: boolean;
  component?: GenericQuestion;
  statusTemplate?: TemplateRef<any>;
}

export default Question;
