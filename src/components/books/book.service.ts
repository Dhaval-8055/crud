import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Book, BookDocument } from "./book.schema";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new this.bookModel(createBookDto);
    return book.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) throw new NotFoundException("Book not found");
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updateBook = await this.bookModel.findByIdAndUpdate(
      id,
      updateBookDto,
      { new: true }
    );
    if (!updateBook) throw new NotFoundException("Book not update");
    return updateBook;
  }

  async delete(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException("Book not deleted");
  }
}
