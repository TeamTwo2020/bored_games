import setup_db

class Db_stuff(object):
    def __init__(self):
        self.cursor=setup_db.words_connect()


    def check_word(self, word):
        first_letter=word[0]
        self.cursor.execute(""" SELECT * FROM eng_words 
                                WHERE first_char=%s AND word=%s""", (first_letter, word))
        return False if self.cursor.rowcount==0 else True

    def incomplete_check(self, word):
        first_letter=word[0]
        self.cursor.execute(""" SELECT * FROM eng_words 
                                WHERE first_char=%s AND word LIKE %s""", (first_letter, '%'+word+'%'))
        return False if self.cursor.rowcount==0 else True