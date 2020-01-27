import setup_db

class Db_stuff(object):
    def __init__(self):
        self.cursor=setup_db.words_connect()


    def check_word(self, word):
        first_letter=word[0]
        self.cursor.execute(""" SELECT * FROM eng_words 
                                WHERE word=%s """, (word))
        return False if self.cursor.rowcount==0 else True



    #function for continuous checking

#invoker setup_db.py in constructor

test_word="recently"
print(test_word)
test=Db_stuff()
test_bool=test.check_word(test_word)
print(test_bool)