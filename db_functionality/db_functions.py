import setup_db
import time

class Db_stuff(object):
    def __init__(self):
        self.cursor=setup_db.words_connect()


    def check_word(self, word):
        first_letter=word[0]
        self.cursor.execute(""" SELECT * FROM eng_words 
                                WHERE first_char=%s AND word=%s""", (first_letter, word))
        return False if self.cursor.rowcount==0 else True

test_word="operation"
test=Db_stuff()


for i in range(500):
    start=time.perf_counter()
    test_bool = test.check_word(test_word)
    print("%f" % (time.perf_counter()-start))
    if test_bool==False:
        print("----ERROR----")

start=time.perf_counter()
test_bool = test.check_word("optimal")
print("%f" % (time.perf_counter()-start))