import os
from logging import getLogger
from PyPDF2 import PdfReader

import openai

from langchaintool.consumer_tool import ConsumptionLLM
from langchain.text_splitter import CharacterTextSplitter

from pdfpaper.models import PDFFile, PDFChunk


logger =getLogger(__name__)

class PDFFileConsumer:

    def __init__(self, pdf_file_id):
        self.pdf_model = PDFFile.objects.get(id=pdf_file_id)
        self.llmtool = ConsumptionLLM()
    

    def process_pdf(self):
        report = {}
        try:

            if self.pdf_model.pdf_type == "SCIENCE":
                self.process_science_paper()

            elif self.pdf_model.pdf_type == "LAW":
                self.process_law_paper()

            else:
                self.process_other_paper()
            
            report["status"] = "complete"
            report["message"] = "completed consuming"
            return  report
        except Exception as e:
            report["status"] = "failed"
            report["message"] = f"{e}"
            return report
        # try: 
            
        #     with self.pdf_model.file.open(mode='rb') as pdf_file:
                
        #         #pdf_content = pdf_file.read()
        #         #fitz_pdf = fitz.open(stream=pdf_content, filetype="pdf")
        #         pdf = PdfReader(pdf_file)
        #         #first_page_text = fitz_pdf.load_page(0).get_text("text")
        #         first_page_text = pdf.pages[0].extract_text()
        #         title, keywords = self.llmtool.get_title_keywords(page_text=first_page_text)

        #         if title:
        #             title = title
                
        #         else:
        #             title = "could not determine title with llm"

        #         self.pdf_model.title = title
        #         self.pdf_model.keywords = keywords
        #         self.pdf_model.save()

        #         for page_num, page in enumerate(pdf.pages, 1):

        #             #text = page.get_text().encode("utf8")
        #             text = page.extract_text()

        #             if text:

        #                 self.save_text(text=text, page_num=page_num, keywords=keywords)

        #         report = {"status": "complete", "message": "pass"}
                
        #         return report


        # except Exception as e:
        #     report = {"status": "complete", "message": "fail"}
        #     logger.error(f"error processing {self.pdf_model},  because: {e}")
             
        #     return report
        

    def process_other_paper(self):
        try: 
            
            with self.pdf_model.file.open(mode='rb') as pdf_file:
                
                #pdf_content = pdf_file.read()
                #fitz_pdf = fitz.open(stream=pdf_content, filetype="pdf")
                pdf = PdfReader(pdf_file)
                #first_page_text = fitz_pdf.load_page(0).get_text("text")
                first_page_text = pdf.pages[0].extract_text()
                title, keywords = self.llmtool.get_title_keywords(page_text=first_page_text)

                if title:
                    title = title
                
                else:
                    title = "could not determine title with llm"

                self.pdf_model.title = title
                self.pdf_model.keywords = keywords
                self.pdf_model.save()

                for page_num, page in enumerate(pdf.pages, 1):

                    #text = page.get_text().encode("utf8")
                    text = page.extract_text()

                    if text:

                        self.save_text(text=text, page_num=page_num, keywords=keywords)

                report = {"status": "complete", "message": "pass"}
                
                return report


        except Exception as e:
            report = {"status": "complete", "message": "fail"}
            logger.error(f"error processing {self.pdf_model},  because: {e}")
             
            return report
    def process_science_paper(self):
        try: 
            
            with self.pdf_model.file.open(mode='rb') as pdf_file:
                
                #pdf_content = pdf_file.read()
                #fitz_pdf = fitz.open(stream=pdf_content, filetype="pdf")
                pdf = PdfReader(pdf_file)
                #first_page_text = fitz_pdf.load_page(0).get_text("text")
                first_page_text = pdf.pages[0].extract_text()
                title, keywords = self.llmtool.get_title_keywords(page_text=first_page_text)

                if title:
                    title = title
                
                else:
                    title = "could not determine title with llm"

                self.pdf_model.title = title
                self.pdf_model.keywords = keywords
                self.pdf_model.save()

                for page_num, page in enumerate(pdf.pages, 1):

                    #text = page.get_text().encode("utf8")
                    text = page.extract_text()

                    if text:

                        self.save_text(text=text, page_num=page_num, keywords=keywords)

                report = {"status": "complete", "message": "pass"}
                
                return report


        except Exception as e:
            report = {"status": "complete", "message": "fail"}
            logger.error(f"error processing {self.pdf_model},  because: {e}")
             
            return report

    def process_law_paper(self):
        try: 
            
            with self.pdf_model.file.open(mode='rb') as pdf_file:
                
                #pdf_content = pdf_file.read()
                #fitz_pdf = fitz.open(stream=pdf_content, filetype="pdf")
                pdf = PdfReader(pdf_file)
                #first_page_text = fitz_pdf.load_page(0).get_text("text")
                first_page_text = pdf.pages[0].extract_text()
                title, keywords = self.llmtool.get_title_keywords(page_text=first_page_text)

                if title:
                    title = title
                
                else:
                    title = "could not determine title with llm"

                self.pdf_model.title = title
                self.pdf_model.keywords = keywords
                self.pdf_model.save()

                for page_num, page in enumerate(pdf.pages, 1):

                    #text = page.get_text().encode("utf8")
                    text = page.extract_text()

                    if text:

                        self.save_text(text=text, page_num=page_num, keywords=keywords)

                report = {"status": "complete", "message": "pass"}
                
                return report


        except Exception as e:
            report = {"status": "complete", "message": "fail"}
            logger.error(f"error processing {self.pdf_model},  because: {e}")
             
            return report 

    def process_images(self, fitz_pdf, fitz_page):
        image_list = fitz_page.get_images()
        img_array = []

        if image_list:
            for image_index, img in enumerate(image_list, start=1):
                xref = img[0]
                matrix = fitz_pdf.extract_image(xref)

                if matrix:
                    image_data = matrix['image']
                    if len(image_data) > self.maintransformer.image_threshold * 1000:
                        image_url = self.saver.upload_to_cloudflare(image_data)
                        img_array.append(image_url)

        return img_array



    def convert_embeddings_from_open_ai(self,text):
        logger.info("INFO::get_embeddings_from_open_ai::starting::")
        openai.api_key = os.environ.get('OPENAI_API_KEY')

        response = openai.Embedding.create(
            input=text,
            model="text-embedding-ada-002"
        )
        embeddings = response['data'][0]['embedding']

        return embeddings
    def chunk_text(self, page_text):


            raw_text = str(page_text)
            #sanitized_text = sanitize_sentence(raw_text)
            text_splitter = CharacterTextSplitter(        
            separator = "\n",
            chunk_size = 1000,
            chunk_overlap  = 200, #striding over the text
            length_function = len,
            )
            texts = text_splitter.split_text(raw_text)

            
            return texts                          
 
    def save_text(self,text, page_num, keywords):
        save_able_chunks = []

        texts = self.chunk_text(page_text=text)

        for chunk in texts:
            #vector = self.convert_text_to_vector(chunk)
            embedding = self.convert_embeddings_from_open_ai(chunk)
            
            chunkmo = PDFChunk(
                text=chunk, 
                embedding=embedding,
                page_number=page_num, 
                pdf=self.pdf_model, 
                keywords=keywords)

            
            save_able_chunks.append(chunkmo)
        #logger.info(f"saving text: {text}")
        PDFChunk.objects.bulk_create(save_able_chunks)
 
