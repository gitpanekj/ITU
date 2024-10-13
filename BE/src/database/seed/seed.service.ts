import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseGroupDto } from 'src/exercise-group/dto/create-exercise-group.dto';
import { ExerciseGroup } from 'src/exercise-group/entities/exercise-group.entity';
import { CreateFlashcardExerciseDto } from 'src/flashcard-exercise/dto/create-flashcard-exercise.dto';
import { CreateFlashcardDto } from 'src/flashcard-exercise/dto/create-flashcard.dto';
import { FlashcardExercise } from 'src/flashcard-exercise/entities/flashcard-exercise.entity';
import { FlashCard } from 'src/flashcard-exercise/entities/flashcard.entity';
import { CreateQuestionAnswerDto } from 'src/quiz-exercise/dto/create-question-answer.dto';
import { CreateQuizExerciseDto } from 'src/quiz-exercise/dto/create-quiz-exercise.dto';
import { CreateQuizQuestionDto } from 'src/quiz-exercise/dto/create-quiz-question.dto';
import { CreateTextReferenceDto } from 'src/quiz-exercise/dto/create-text-reference.dto';
import { CreateTextDto } from 'src/quiz-exercise/dto/create-text.dto';
import { UpdateQuizExerciseDto } from 'src/quiz-exercise/dto/update-quiz-exercise.dto';
import { UpdateQuizQuestionDto } from 'src/quiz-exercise/dto/update-quiz-question.dto';
import { QuestionAnswer } from 'src/quiz-exercise/entities/question-answer.entity';
import { QuizExercise } from 'src/quiz-exercise/entities/quiz-exercise.entity';
import { QuizQuestion } from 'src/quiz-exercise/entities/quiz-question.entity';
import { TextReference } from 'src/quiz-exercise/entities/text-reference.entity';
import { QuizText } from 'src/quiz-exercise/entities/text.entity';
import { CreateTeacherDto } from 'src/teacher/dto/create-teacher.dto';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Connection, DataSource, Repository } from 'typeorm';

@Injectable()
export class SeedService {
  private repositories: Repository<any>[];
  private teacherSeeds: CreateTeacherDto[];
  private exerciseGroupSeeds: CreateExerciseGroupDto[];
  private flashcardExerciseSeeds: CreateFlashcardExerciseDto[];
  private flashcardSeeds: CreateFlashcardDto[];
  private quizExerciseSeeds: CreateQuizExerciseDto[];
  private quizQuestionSeeds: CreateQuizQuestionDto[];
  private questionAnswerSeeds: CreateQuestionAnswerDto[];
  private textSeeds: CreateTextDto[];
  private textReferenceSeeds: CreateTextReferenceDto[];

  constructor(
    @InjectRepository(Teacher) private teacherRepositoty: Repository<Teacher>,
    @InjectRepository(ExerciseGroup)
    private exerciseGroupRepositoty: Repository<ExerciseGroup>,
    @InjectRepository(FlashcardExercise)
    private flashcardExerciseRepositoty: Repository<FlashcardExercise>,
    @InjectRepository(FlashCard)
    private flashCardRepositoty: Repository<FlashCard>,
    @InjectRepository(QuizExercise)
    private quizExerciseRepositoty: Repository<QuizExercise>,
    @InjectRepository(QuizQuestion)
    private quizQuestionRepositoty: Repository<QuizQuestion>,
    @InjectRepository(QuestionAnswer)
    private questionAnswerRepositoty: Repository<QuestionAnswer>,
    @InjectRepository(QuizText)
    private quizTextRepositoty: Repository<QuizText>,
    @InjectRepository(TextReference)
    private textReferenceRepositoty: Repository<TextReference>,
    @InjectDataSource() private readonly dataSource: DataSource
  ) {
    // Repositories
    this.repositories = [
      flashCardRepositoty,
      flashcardExerciseRepositoty,
      questionAnswerRepositoty,
      quizQuestionRepositoty,
      textReferenceRepositoty,
      quizTextRepositoty,
      quizExerciseRepositoty,
      exerciseGroupRepositoty,
      teacherRepositoty,
    ];
    this.teacherSeeds = [
      { id: 1, username: 'Blitzdonner Wursthelm' },
      { id: 2, username: 'Zuckerblitz Schnurrbart' },
    ];

    this.exerciseGroupSeeds = [
      {
        id: 1,
        name: 'Quantum Banana Dynamics',
        description:
          'Dive into the wacky world of physics, where you’ll learn how quantum particles and, yes, bananas, can be both here and there at the same time!',
        teacherId: 1,
      },
      {
        id: 2,
        name: 'Advanced Procrastination Techniques: Mastering the Art of Doing Nothing',
        description:
          'A comprehensive guide to becoming a top-level procrastinator, complete with tips on how to delay work while feeling productive!',
        teacherId: 1,
      },
      {
        id: 3,
        name: 'Unicorn Algebra: Solving Mystical Equations with Glitter',
        description:
          'Math has never been this magical! Learn algebra while sprinkling in rainbows, glitter, and, of course, unicorn logic to solve your toughest equations.',
        teacherId: 2,
      },
    ];
    this.flashcardExerciseSeeds = [
      {
        id: 1,
        name: 'FlashCardExercise1',
        description: 'description1',
        groupId: 1,
      },
      {
        id: 2,
        name: 'FlashCardExercise2',
        description: 'description2',
        groupId: 1,
      },
      {
        id: 3,
        name: 'FlashCardExercise3',
        description: 'description3',
        groupId: 2,
      },
      {
        id: 4,
        name: 'FlashCardExercise4',
        description: 'description4',
        groupId: 3,
      },
    ];
    this.flashcardSeeds = [
      {
        id: 1,
        frontFace: 'Q: What is superposition in quantum physics?',
        backFace:
          'A: Superposition is when particles exist in multiple states at once, like a banana that is both peeled and unpeeled at the same time!',
        flashcardExerciseId: 1,
      },
      {
        id: 2,
        frontFace: 'Q: How can a banana exhibit wave-particle duality?',
        backFace:
          'A: Just like light, in the quantum world, bananas can behave as both a wave and a particle—imagine a banana surfing its own wave!',
        flashcardExerciseId: 1,
      },
      {
        id: 3,
        frontFace: 'Q: What happens when you observe a quantum banana?',
        backFace:
          'A: The act of observation collapses its wave function, forcing the banana to choose one state: peeled or unpeeled—but never both!',
        flashcardExerciseId: 1,
      },

      {
        id: 4,
        frontFace: 'Q: What is quantum entanglement with bananas?',
        backFace:
          'A: Quantum entanglement means that two bananas, no matter how far apart, can be linked in such a way that peeling one instantly affects the state of the other!',
        flashcardExerciseId: 1,
      },
      {
        id: 5,
        frontFace: 'Q: How does Schrödinger’s Banana work?',
        backFace:
          'A: Schrödinger’s Banana is both peeled and unpeeled until you open the box and observe it, collapsing the banana’s quantum state into one reality.',
        flashcardExerciseId: 1,
      },
      {
        id: 6,
        frontFace: 'Q: Can a banana teleport in quantum physics?',
        backFace:
          'A: Theoretically, yes! Quantum teleportation allows a banana’s properties to be transmitted to another location, but the banana itself doesn’t move—its state is recreated elsewhere.',
        flashcardExerciseId: 1,
      },

      {
        id: 7,
        frontFace: 'Q: What is the "Strategic Napping" method?',
        backFace:
          'A: A technique where you nap just long enough to feel productive, but not long enough to actually get anything done!',
        flashcardExerciseId: 2,
      },
      {
        id: 8,
        frontFace: 'Q: Define the "Just One More Episode" principle.',
        backFace:
          'A: This principle allows for prolonged distraction by convincing yourself that one more episode of a show won’t affect your productivity.',
        flashcardExerciseId: 2,
      },
      {
        id: 9,
        frontFace: 'Q: What is the “Crisis Motivation” technique?',
        backFace:
          'A: The art of waiting until the last possible minute to do something, maximizing the adrenaline-fueled productivity that only comes in a panic',
        flashcardExerciseId: 2,
      },

      {
        id: 10,
        frontFace:
          'Q: What is the Unicorn Method for solving quadratic equations?',
        backFace:
          'A: Sprinkle glitter on both sides of the equation, then magically factor the quadratic by using unicorn powers (or the quadratic formula).',
        flashcardExerciseId: 3,
      },
      {
        id: 11,
        frontFace: 'Q: How do you find the slope of a rainbow graph?',
        backFace:
          'A: The slope is the number of unicorns dancing along the arc of the rainbow, divided by the amount of glitter spread per unit of joy.',
        flashcardExerciseId: 3,
      },
      {
        id: 12,
        frontFace: 'Q: What is the magical constant in Unicorn Algebra?',
        backFace:
          'A: It’s the amount of sparkle required to make every equation work—denoted as 🦄(π), where 🦄 is the sparkle coefficient.',
        flashcardExerciseId: 3,
      },
    ];

    this.quizExerciseSeeds = [
      { id: 1, name: 'Quiz1', description: 'quiz description 1', groupId: 1 },
      { id: 2, name: 'Quiz2', description: 'quiz description 2', groupId: 1 },
      { id: 3, name: 'Quiz3', description: 'quiz description 3', groupId: 2 },
      { id: 4, name: 'Quiz4', description: 'quiz description 4', groupId: 3 },
    ];
    this.quizQuestionSeeds = [
      { id: 1, question: 'Question 1', quizId: 1 },
      { id: 2, question: 'Question 2', quizId: 1 },

      { id: 3, question: 'Question 1', quizId: 2 },
      { id: 4, question: 'Question 2', quizId: 2 },

      { id: 5, question: 'Question 1', quizId: 3 },
      { id: 6, question: 'Question 2', quizId: 3 },
    ];
    this.questionAnswerSeeds = [
      { id: 1, answer: 'Answer1', questionId: 1 },
      { id: 2, answer: 'Answer2', questionId: 1 },
      { id: 3, answer: 'Answer3', questionId: 1 },
      { id: 4, answer: 'Answer4', questionId: 1 },

      { id: 5, answer: 'Answer1', questionId: 2 },
      { id: 6, answer: 'Answer2', questionId: 2 },
      { id: 7, answer: 'Answer3', questionId: 2 },
      { id: 8, answer: 'Answer4', questionId: 2 },

      { id: 9, answer: 'Answer1', questionId: 3 },
      { id: 10, answer: 'Answer2', questionId: 3 },
      { id: 11, answer: 'Answer3', questionId: 3 },
      { id: 12, answer: 'Answer4', questionId: 3 },

      { id: 13, answer: 'Answer1', questionId: 4 },
      { id: 14, answer: 'Answer2', questionId: 4 },
      { id: 15, answer: 'Answer3', questionId: 4 },
      { id: 16, answer: 'Answer4', questionId: 4 },

      { id: 17, answer: 'Answer1', questionId: 5 },
      { id: 18, answer: 'Answer2', questionId: 5 },
      { id: 19, answer: 'Answer3', questionId: 5 },
      { id: 20, answer: 'Answer4', questionId: 5 },

      { id: 21, answer: 'Answer1', questionId: 6 },
      { id: 22, answer: 'Answer2', questionId: 6 },
      { id: 23, answer: 'Answer3', questionId: 6 },
      { id: 24, answer: 'Answer4', questionId: 6 },
    ];

    this.textSeeds = [
      { id: 1, content: 'Content1' },
      { id: 2, content: 'Content2' },
      { id: 3, content: 'Content3' },
      { id: 4, content: 'Content4' },
    ];
    this.textReferenceSeeds = [
        {id: 1, referenceId: 1, textId: 1, questionId: 1},
        {id: 2, referenceId: 1, textId: 1, questionId: 2},

        {id: 3, referenceId: 1, textId: 2, questionId: 3},
        {id: 4, referenceId: 1, textId: 2, questionId: 4},

        {id: 5, referenceId: 1, textId: 3, questionId: 5},
        {id: 6, referenceId: 1, textId: 3, questionId: 6},
    ];
  }

  async seedDB() {
    // clear DB
    console.log('==== Clearing DB ====');
    for (const repository of this.repositories) {
        await this.clearRepository(repository);
    }

    // Resent autoincrement
    await this.resetAutoIncrementSequences();


    await this.seedTeacher();
    console.log("Teachers seeded");
    await this.seedExerciseGroup();
    console.log("GroupsTeachers seeded");
    await this.seedFlashcardExercise();
    console.log("Flashcard exercises seeded");
    await this.seedQuizExercise();
    console.log("Quiz exercises seeded");
    await this.seedQuizQuestion();
    console.log("Quiz questions seeded");
    await this.seedText();
    console.log("Texts seeded");
    await this.seedTextReferences()
    console.log("Text references seeded");
  }


  /*******  Seeding functions functions *******/

  async clearRepository<Type>(repository: Repository<Type>) {
    const tablename = repository.metadata.tableName;
    console.log(`--- Clearing ${tablename}---`);
    await repository.query(`TRUNCATE TABLE "${tablename}" CASCADE`);
    console.log(`--- Cleared  ${tablename}---`);
  }

  /*
   * Seed teachers only
   */
  async seedTeacher(): Promise<void> {
    for (const seed of this.teacherSeeds) {
      let teacher = this.teacherRepositoty.create(seed);
      await this.teacherRepositoty.save(teacher);
    }
  }

  /*
   * Seed exercise group for teachers
   */
  async seedExerciseGroup(): Promise<void> {
    for(const seed of this.exerciseGroupSeeds) {
      let group = this.exerciseGroupRepositoty.create(seed);
      await this.exerciseGroupRepositoty.save(group);
    }
  }

  /*
   * Seed flashcard exercises and add flashcards
   */
  async seedFlashcardExercise(): Promise<void> {
    // Seed exercises
    for (const seed of this.flashcardExerciseSeeds) {
      let exercise = this.flashcardExerciseRepositoty.create(seed);
      await this.flashcardExerciseRepositoty.save(exercise);
    }

    // Add flashcards
    for (const seed of this.flashcardSeeds){
      let teacher = this.flashCardRepositoty.create(seed);
      await this.flashCardRepositoty.save(teacher);
    }
  }

  /*
   * Seed quiz exercise only
   */
  async seedQuizExercise(): Promise<void> {
    for (const seed of this.quizExerciseSeeds) {
      let quiz = this.quizExerciseRepositoty.create(seed);
      await this.quizExerciseRepositoty.save(quiz);
    }
  }

  /*
   * Seed quiz questions including answers and right answers
   */
  async seedQuizQuestion(): Promise<void> {
    // Seed questions
    for (const seed of  this.quizQuestionSeeds) {
      let question = this.quizQuestionRepositoty.create(seed);
      await this.quizQuestionRepositoty.save(question);
    }

    // Seed answers
    for (const seed of this.questionAnswerSeeds) {
      let answer = this.questionAnswerRepositoty.create(seed);
      await this.questionAnswerRepositoty.save(answer);
    }

    // Seed right answers
    for (const seed of this.quizQuestionSeeds) {
      let question = await this.quizQuestionRepositoty.findOne({
        where: { id: seed.id },
      });
      const updateQuizQuestionDto: UpdateQuizQuestionDto = {
        rightAnswerId: 1 + (seed.id - 1) * 4,
      };
      Object.assign(question, updateQuizQuestionDto);
      await this.quizQuestionRepositoty.save(question);
    }
  }

  /*
   * Seed Text and reference them to quizes
   */
  async seedText(): Promise<void> {
    for (const seed of this.textSeeds){
      let text = this.quizTextRepositoty.create(seed);
      await this.quizTextRepositoty.save(text);
    }

    for (const seed of this.quizExerciseSeeds) {
      const quiz = await this.quizExerciseRepositoty.findOne({
        where: { id: seed.id },
      });
      const updateQuizExerciseDto: UpdateQuizExerciseDto = { textId: seed.id };
      Object.assign(quiz, updateQuizExerciseDto);
      await this.quizExerciseRepositoty.save(quiz);
    }
  }

  /*
   * Seed text references
   */
  async seedTextReferences(): Promise<void> {
    for (const seed of this.textReferenceSeeds) {
      let text = this.textReferenceRepositoty.create(seed);
      await this.textReferenceRepositoty.save(text);
    }
  }

  async resetAutoIncrementSequences() {
    // List of repositories to process

    for (const repository of this.repositories) {
        const tableName = repository.metadata.tableName;

        // Fetch the sequence name associated with the 'id' column
        const primaryKeySequence = await repository.query(`
          SELECT pg_get_serial_sequence($1, 'id') AS sequence_name;
        `, [tableName]);
  
        if (primaryKeySequence[0].sequence_name) {
          const sequenceName = primaryKeySequence[0].sequence_name;
  
          // Reset the sequence
          await repository.query(`
            ALTER SEQUENCE ${sequenceName} RESTART WITH 1;
          `);
        } 
    }
  }
}
